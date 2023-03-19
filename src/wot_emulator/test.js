const requests = require('./requests.js');

const util = require('./utils.js');

const config = require('./config.json');

let devices = [];

const startTest = async() =>{
    const res = await requests.getAH();
    devices = await findWot(res.data.data);
    devices = devices.filter(item => util.checkIfInteger(item.serviceDefinition.serviceDefinition));
    await randomdev();   
}

const findWot = async (data) =>{
    let wotdevices = [];
    for(let i = 0; i < data.length; i++){
        if(util.checkMetadata(data[i])){
            let device = await requests.checkUrlDevice(data[i]);
            if(device != undefined){
                wotdevices.push(data[i]);
            }
        }
    }
    return wotdevices;
}

const randomdev = async() =>{
    let numdev = Math.floor(Math.random() * devices.length);
    let numvalue = Math.floor(Math.random() * 101);
    console.log(numvalue);
    await requests.postWoTvalue(devices[numdev], numvalue);
    if(config.mode.push){
        await requests.notifyDevice();
    }
    setTimeout(randomdev, Math.floor(Math.random() * config.interval));
}

module.exports = startTest;