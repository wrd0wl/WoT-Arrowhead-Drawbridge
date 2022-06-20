const util = require('./utils.js');


module.exports = (data, index) => {
    let id = index < 10? '0' + index: '' + index;
    let systemName = util.getDeviceType(data) + id;
    let device = util.getDeviceType(data);
    const ahBody = {
        "endOfValidity":"2034-01-01 23:59:59",
        "interfaces":[
           "HTTPS-SECURE-JSON"
        ],
        "providerSystem":{
           "address": "http://localhost",
           "port": 8080,
           "systemName": systemName
        },
        "metadata":{
         "additionalProp1": data
        },
        "secure":"NOT_SECURE",
        "serviceDefinition": device,
        "serviceUri":"/" + systemName,
        "version":0
    }
    return ahBody;
}