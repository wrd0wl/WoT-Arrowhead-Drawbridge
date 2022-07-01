let jsonDescriptor = require('./descriptor.json');
let conditionsDescriptor = jsonDescriptor.triggers[0].conditions;
let effectsDescriptor = jsonDescriptor.triggers[0].effects;

let util = require('./utils.js');

let requests = require('./requests.js');

const interactionControl = async (data) =>{
    let checkedProperty;
    if(conditionsDescriptor.hasOwnProperty('AND')){
        checkedProperty = true;
        for(let i = 0; i < data.length; i++){
            const descriptor = util.checkSelector(data[i], conditionsDescriptor.AND);
            if(descriptor != undefined){
                const propertyValue = await requests.getPropertyValue(data[i], descriptor);
                if(!util.checkProperty(propertyValue.data, descriptor)){
                    checkedProperty = false;
                }
            }
        }
    }
    else if(conditionsDescriptor.hasOwnProperty('OR')){
        for(let i = 0; i < data.length; i++){
            const descriptor = util.checkSelector(data[i], conditionsDescriptor.OR);
            if(descriptor != undefined){
                const propertyValue = await requests.getPropertyValue(data[i], descriptor);
                if(util.checkProperty(propertyValue.data, descriptor)){
                    checkedProperty = true;
                }
            }
        }
    }
    if(checkedProperty){
        for(let i = 0; i < data.length; i++){
            const action = util.checkSelector(data[i], effectsDescriptor);
            if(action != undefined){
                await requests.postEffects(data[i], action);
            }
        }
    }
}


module.exports = interactionControl;