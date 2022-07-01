const requests = require('./requests.js');

const util = require('./utils.js');

const control = require('./control.js');

const devices = [];

const drawbridge = async () =>{
    const res = await requests.getAH();
    const data = res.data.data;
    data.forEach(findWot);
    await control(devices);
}

const findWot = (data) =>{
    if(util.checkMetadata(data)){
        devices.push(data);
    }
}

module.exports = drawbridge;
