# HTTP-protocol.
Support for this protocol was introduced in the nodebrawl-core-http fork.

## How do you start it up?
If you use the nodebrawl-core-http fork, it's enabled by default with the server on standard port 80. You should see the following message in the console:
```
[HTTP] >> HTTP server started on 80 port!
```
* You can chainge port in `index.js` file.
## What can it be used for?
Basically, to create your own APIs.<br>
As an example: Getting information about a player.

## How to write your own method?
You need to create a file in the `/Protocol/HTTP` directory with any name, but it must end in `.js`<br>
Example: `GetServerHealth.js`<br>
In the file itself, you should use the following skeleton:
```js
class ExampleRequest{
    constructor(){
        this.path = "/example"; // /yourpath
        this.method = "GET"
    };

    async handle(ctx){
        ctx.body = "<h1>Hello world!</h1>"
    }
};

module.exports = ExampleRequest
```
### Let's look at the details...

```js
class ExampleRequest {}
```
Class initialization. I think this should be clear.
```js
constructor(){
    this.path = "/example"; // /yourpath
    this.method = "GET"
};
```
The constructor of our class, which contains the necessary data for the server.
* `this.path` - The path where our method will be located.<br>
For example, if you enter `this.path = "/server"`, you can get information through the URL `http://localhost/server`.
* `this.method` - HTTP method. For example, `GET` or `POST`, or other HTTP methods<br>
Note that if you try to use the `POST` method via any other HTTP method, the server will generate an error on the client side.


```js
async handle(ctx){
    ctx.body = "<h1>Hello world!</h1>"
}
```
This is where our method code is stored.<br>
The `koa` module is used for the HTTP server.


#### Interesting fact: While writing this documentation, I lost the meaning of the word "method" :D
