const config = require('../config.json')

const requests = require('./requests.js');

const util = require('./utils.js');

const polling = require('./polling.js');

const devices = [];

const drawbridge = async () =>{
    const res = await requests.getAH();
    const data = res.data.data;
    await data.forEach(findWot);

    if(devices.length && config.mode.polling){
        await polling(devices);
    }
    else{
        console.log('There are no available WoT devices.')
        process.exit(1);

    }
}

const findWot = async(data) =>{
    if(util.checkMetadata(data) && await requests.checkUrlDevice(data)){
        devices.push(data);
    }
}

module.exports = drawbridge;
