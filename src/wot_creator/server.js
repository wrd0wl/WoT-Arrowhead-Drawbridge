//create singleton server
const conf = require('../config.json');

Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;

const wotServer = {
    "server": undefined,
    startServer(){
        let httpServer = new HttpServer({ port: conf.wot.port });
        let servient = new Servient();
        servient.addServer(httpServer);

        this.server = servient.start();
    },
    getServer(){
        return this.server;
    }
}

module.exports = wotServer;