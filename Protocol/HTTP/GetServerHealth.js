class GetServerHealthRequest{
    constructor(){
        this.path = "/GetServerHealth"; // /yourpath
        this.method = "GET"
    };

    async handle(ctx){
        ctx.body = { ok: true, startedAgo: process.uptime() }
    }
};

module.exports = GetServerHealthRequest