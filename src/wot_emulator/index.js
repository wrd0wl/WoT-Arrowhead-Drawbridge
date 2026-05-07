let jsonDevices = require('./devices.json');

const config = require('./config.json');

const wot = require('./wot.js');

const util = require('./utils.js');

const requests = require('./requests.js');

const ahFactory = require('./factory/ahFactory.js');

const test = require('./test.js');

const startWot = async () =>{
    const res = await requests.getAH();
    const data = res.data.data;
    for(let i = 0; i < jsonDevices.length; i++){
        console.log(`Starting WoT device: ${jsonDevices[i].selector}`);
        await wot(jsonDevices[i], i + 1);
        if(!util.checkIfWotExists(data, jsonDevices[i])){
            await requests.postToAHS(ahFactory(jsonDevices[i].selector, i + 1));        
        }
    }
}

startWot();