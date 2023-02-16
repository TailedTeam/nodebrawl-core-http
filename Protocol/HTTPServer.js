const Koa = require('koa');
const KoaRange = require('koa-range');
const fs = require("fs");
const app = new Koa();

app.use(KoaRange)

class HTTPServer{
    constructor(port){
        this.port = port;
        this.turnOffFavicon = true;
        this.paths = {}
    };

    async launch(){
        this.preparePaths();

        app.use(async (ctx) => {
            let filteredPath = ctx.request.url.split("?")[0];
            let clientIP = ctx.request.ip.split(":")[3];

            if (filteredPath == "/favicon.ico" && this.turnOffFavicon) return;

            let SelectedPath = this.paths[filteredPath];
            if (SelectedPath) {
                try{
                    let pathClass = new SelectedPath()

                    if (pathClass.method != ctx.request.method) {
                        console.log(`[${clientIP}] >> Gotcha ${ctx.request.method} request on path ${filteredPath} (${pathClass.constructor.name}), handling placeholder...`);
                        return ctx.body = "Request has incorrect method"
                    };

                    console.log(`[${clientIP}] >> Gotcha ${ctx.request.method} request on path ${filteredPath} (${pathClass.constructor.name})`);
                
                    await pathClass.handle(ctx)
                }catch(e){
                    console.log(`[${clientIP}] >> HTTP server caught an error!\n${e.stack}`)
                }
            }else{
                console.log(`[${clientIP}] >> Gotcha ${ctx.request.method} request on undefined path ${filteredPath}`);
                ctx.body = 'No path defined!';
            }
        });

        console.log(`[HTTP] >> HTTP server started on ${this.port} port!`);
        app.listen(this.port)
    }

    preparePaths(){
        fs.readdir('./Protocol/HTTP', (err, files) => {
            if (err) console.log(err);
            files.forEach(e => {
              const Path = require(`./HTTP/${e.replace('.js', '')}`);
              const pathClass = new Path();

              this.paths[pathClass.path] = Path
            })
        })
    }
};

module.exports = HTTPServer
