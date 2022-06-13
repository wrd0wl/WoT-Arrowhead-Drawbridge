const { default: axios } = require("axios");
let jsonDevices = require("./devices.json")

const wot = require("./wot.js");

const control = require("./control");

const util = require('./utils');

let devices = [];


const bridge = async () => {
    for(var i = 0; i < jsonDevices.length; i++){
       await wot(jsonDevices[i]);
       devices.push(util.parseTitle(jsonDevices[i].selector));
    }


    await control(devices);
}

module.exports = bridge;