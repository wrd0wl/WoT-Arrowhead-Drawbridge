const requests = require('./requests.js');

const util = require('./utils.js');

requests.getAH().then(resp =>{
    let allDevices = [];
    for(let i = 0; i < resp.data.data.length; i++){
        if(resp.data.data[i].metadata != undefined && resp.data.data[i].metadata.hasOwnProperty('additionalProp1') && util(resp.data.data[i].metadata.additionalProp1)){
            allDevices.push(resp.data.data[i]);
        }
    }
    console.log(allDevices);
});