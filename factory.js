//using factory pattern to create thing description

const util = require('./utils')

module.exports = (data) =>{
    let idValue = util.parseId(data.selector);
    let titleValue = util.parseTitle(data.selector);
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
        id: idValue,
        title: titleValue,
        properties:{
            [propertyKey]: {
                type: propertyType,
                description: "Current value",
            }
        },
        actions: actionKey,
    };

    //util.wotJson(data.selector, propertyKey, Object.keys(actionKey)[0]);

    return thingDescription;
}