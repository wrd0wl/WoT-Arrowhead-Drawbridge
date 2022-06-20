//create singleton server
Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;

const wotServer = {
    "server": undefined,
    startServer(){
        let httpServer = new HttpServer({ port: 8080 });
        let servient = new Servient();
        servient.addServer(httpServer);

        this.server = servient.start();
    },
    getServer(){
        return this.server;
    }
}

module.exports = wotServer;