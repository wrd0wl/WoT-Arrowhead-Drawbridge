const config = require('../config.json')

const requests = require('./requests.js');

const util = require('./utils.js');

const polling = require('./polling.js');

const devices = [];

const drawbridge = async () =>{
    const res = await requests.getAH();
    const data = res.data.data;
    data.forEach(findWot);

    if(config.mode.polling){
        await polling(devices);
    }
}

const findWot = (data) =>{
    if(util.checkMetadata(data)){
        devices.push(data);
    }
}

module.exports = drawbridge;
