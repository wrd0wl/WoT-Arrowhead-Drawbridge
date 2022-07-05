const config = require('../config.json')

const requests = require('./requests.js');

const util = require('./utils.js');

const polling = require('./polling.js');

const api = require('./api.js');

const devices = [];

const drawbridge = async () =>{
    if(config.mode.polling){
        const res = await requests.getAH();
        const data = res.data.data;
        await data.forEach(findWot);
        if(devices.length){
            await polling(devices);
        }
        else{
            console.log('No available devices.');
            process.exit(1);
        }
    }
    else if(config.mode.api){
        api();
    }
}

const findWot = async(data) =>{
    if(util.checkMetadata(data) && await requests.checkUrlDevice(data)){
        devices.push(data);
    }
}

module.exports = drawbridge;
