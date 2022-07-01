const requests = require('./requests.js');

const util = require('./utils.js');

const control = require('./control.js');

const polling = require('./polling.js');

const devices = [];

const drawbridge = async () =>{
    const res = await requests.getAH();
    const data = res.data.data;
    data.forEach(findWot);
    await polling(devices);
}

const findWot = (data) =>{
    if(util.checkMetadata(data)){
        devices.push(data);
    }
}

module.exports = drawbridge;
