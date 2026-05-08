// Singleton WoT server
const conf = require('./config.json');

Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;

const wotServer = {
    "server": undefined,

    async startServer() {
        console.log(`[server] Starting WoT HTTP server on port ${conf.wot.port}...`);
        let httpServer = new HttpServer({ port: conf.wot.port });
        let servient = new Servient();
        servient.addServer(httpServer);
        this.server = await servient.start();
        console.log(`[server] WoT server started on port ${conf.wot.port}`);
    },

    getServer() {
        return this.server;
    }
}

module.exports = wotServer;