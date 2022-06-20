let jsonDevices = require("./devices.json");

const axios = require('axios').default;

const wot = require("./wot.js");

const factory = require('./ahFactory.js');

const requests = require('./requests.js');
const ahFactory = require("./ahFactory.js");

startWot = async () =>{
    for(var i = 0; i < jsonDevices.length; i++){
        await wot(jsonDevices[i], i + 1);
        await requests(ahFactory(jsonDevices[i].selector, i + 1));
    }
}



startWot();