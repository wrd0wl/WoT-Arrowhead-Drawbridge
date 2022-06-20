//using factory pattern to create thing description

const util = require('./utils')

module.exports = (data, index) =>{
    let deviceId = index < 10? '0' + index: '' + index;
    let deviceTitle = util.getDeviceType(data.selector) + deviceId;
    let deviceDescription = data.selector;
    let propertyKey = util.getProperty(data.selector);
    let propertyType = util.getValueType(data.value);
    let actionKey = util.getActionsDescription(data.selector);
    const thingDescription = {
        "@context": [
            "https://www.w3.org/2019/wot/td/v1",
            {
              "@language": "en",
            },
          ],
        id: deviceId,
        title: deviceTitle,
        description: deviceDescription,
        properties:{
            [propertyKey]: {
                type: propertyType,
                description: "Current value",
            }
        },
        actions: actionKey,
    };

    return thingDescription;
}