let jsonDescriptor = require('./descriptor.json');
let conditionsDescriptor = jsonDescriptor.triggers[0].conditions;
let effectsDescriptor = jsonDescriptor.triggers[0].effects;

let util = require('./utils.js');

let requests = require('./requests.js');

const interactionControl = async (data) =>{
    let checkedProperty = false;
    if(Object.keys(conditionsDescriptor) == 'AND'){
        for(let i = 0; i < conditionsDescriptor.AND.length; i++){
            let devices = [];
            devices.push(util.matchDevice(conditionsDescriptor.AND[i].selector, data));
            let checked = false;
            for(let j = 0; j < devices.length; j++){
                await requests.getRequest(devices[j], conditionsDescriptor.AND[i].property).then(resp =>{
                    if(conditionsDescriptor.AND[i].operator == 'gte'){
                        if(resp.data >= conditionsDescriptor.AND[i].value){
                          checked = true;
                        }
                      }
                      else if(conditionsDescriptor.AND[i].operator == 'gt'){
                        if(resp.data > conditionsDescriptor.AND[i].value){
                          checked = true;
                        }
                      }
                      else if(conditionsDescriptor.AND[i].operator == 'lte'){
                        if(resp.data <= conditionsDescriptor.AND[i].value){
                          checked = true;
                        }
                      }
                      else if(conditionsDescriptor.AND[i].operator == 'lt'){
                        if(resp.data < conditionsDescriptor.AND[i].value){
                          checked = true;
                        }
                      }
                      else if(conditionsDescriptor.AND[i].operator == 'eq'){ //eq
                        if(resp.data == conditionsDescriptor.AND[i].value){
                          checked = true;
                        }
                      }
                });
            }
            checkedProperty = checked;
        }
    }
    else if(Object.keys(conditionsDescriptor) == 'OR'){
        for(let i = 0; i < conditionsDescriptor.OR.length; i++){
            let devices = [];
            devices.push(util.matchDevice(conditionsDescriptor.OR[i].selector, data));
            for(let j = 0; j < devices.length; j++){
                await requests.getRequest(devices[j], conditionsDescriptor.OR[i].property).then(resp =>{
                    if(conditionsDescriptor.OR[i].operator == 'gte'){
                        if(resp.data >= conditionsDescriptor.OR[i].value){
                          checkedProperty = true;
                        }
                      }
                      else if(conditionsDescriptor.OR[i].operator == 'gt'){
                        if(resp.data > conditionsDescriptor.OR[i].value){
                          checkedProperty = true;
                        }
                      }
                      else if(conditionsDescriptor.OR[i].operator == 'lte'){
                        if(resp.data <= conditionsDescriptor.OR[i].value){
                          checkedProperty = true;
                        }
                      }
                      else if(conditionsDescriptor.OR[i].operator == 'lt'){
                        if(resp.data < conditionsDescriptor.OR[i].value){
                          checkedProperty = true;
                        }
                      }
                      else if(conditionsDescriptor.OR[i].operator == 'eq'){ //eq
                        if(resp.data == conditionsDescriptor.OR[i].value){
                          checkedProperty = true;
                        }
                      }
                });
            }
        }
    }
    if(checkedProperty){
        for(let i = 0; i < effectsDescriptor.length; i++){
            let devices = [];
            devices.push(util.matchDevice(effectsDescriptor[i].selector, data));
            for(let j = 0; j < devices.length; j++){
                await requests.postRequest(devices[j], effectsDescriptor[i].affordanceName);
            }
        }
    }
}

module.exports = interactionControl;