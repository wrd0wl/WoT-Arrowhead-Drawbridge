let jsonData = require('./descriptor.json');

let conditionsDescriptor = jsonData.triggers[0].conditions;

let effectsDescriptor = jsonData.triggers[0].effects[0];

let conditions1 = {
  "AND": [{
    "selector": "building01.floor02.room02.accl.*",
    "property": "Value",
    "operator": "gte",
    "values": [42]
  }, {
    "selector": "building01.floor02.*.plug.*",
    "property": "PoweredOn",
    "operator": "eq",
    "values": [true]
  }]
}

let conditions2 = {
  "OR": [{
    "selector": "building01.floor02.room02.accl.*",
    "property": "Value",
    "operator": "gte",
    "values": [42]
  }, {
    "selector": "building01.floor03.*.plug.*",
    "property": "PoweredOn",
    "operator": "eq",
    "values": [false]
  }]
}



function checkConditions(conditions){
  if(!(Object.keys(conditions).length === 0 && conditions.constructor === Object)){
    if(Object.keys(conditions) == 'AND' && Object.keys(conditionsDescriptor) == 'AND'){
      let checked1 = false;
      for(let i = 0; i < conditions.AND.length; i++){
        let checked2 = false;
          for(let j = 0; j < conditionsDescriptor.AND.length; j++){
            if(conditions.AND[i].selector == conditionsDescriptor.AND[j].selector){
              if(conditions.AND[i].property == conditionsDescriptor.AND[j].property){
                if(conditions.AND[i].operator == 'gte'){
                  if(conditions.AND[i].values[0] >= conditionsDescriptor.AND[j].values[0]){
                    checked2 = true;
                  }
                }
                else if(conditions.AND[i].operator == 'gt'){
                  if(conditions.AND[i].values[0] > conditionsDescriptor.AND[j].values[0]){
                    checked2 = true;
                  }
                }
                else if(conditions.AND[i].operator == 'lte'){
                  if(conditions.AND[i].values[0] <= conditionsDescriptor.AND[j].values[0]){
                    checked2 = true;
                  }
                }
                else if(conditions.AND[i].operator == 'lt'){
                  if(conditions.AND[i].values[0] < conditionsDescriptor.AND[j].values[0]){
                    checked2 = true;
                  }
                }
                else{ //eq
                  if(conditions.AND[i].values[0] == conditionsDescriptor.AND[j].values[0]){
                    checked2 = true;
                  }
                }
              }
            }
          }
          checked1 = checked2;
      }
      if(checked1){
        console.log(effectsDescriptor.selector);
        console.log(effectsDescriptor.affordanceType);
        console.log(effectsDescriptor.affordanceName);
      }
    }
    else if(Object.keys(conditions) == 'OR' && Object.keys(conditionsDescriptor) == 'OR'){
      let checked = false;
      for(let i = 0; i < conditions.OR.length; i++){
        for(let j = 0; j < conditionsDescriptor.OR.length; j++){
          if(conditions.OR[i].selector == conditionsDescriptor.OR[j].selector){
            if(conditions.OR[i].property == conditionsDescriptor.OR[j].property){
              if(conditions.OR[i].operator == 'gte'){
                if(conditions.OR[i].values[0] >= conditionsDescriptor.OR[j].values[0]){
                  checked = true;
                }
              }
              else if(conditions.OR[i].operator == 'gt'){
                if(conditions.OR[i].values[0] > conditionsDescriptor.OR[j].values[0]){
                  checked = true;
                }
              }
              else if(conditions.OR[i].operator == 'lte'){
                if(conditions.OR[i].values[0] <= conditionsDescriptor.OR[j].values[0]){
                  checked = true;
                }
              }
              else if(conditions.OR[i].operator == 'lt'){
                if(conditions.OR[i].values[0] < conditionsDescriptor.OR[j].values[0]){
                  checked = true;
                }
              }
              else{ //eq
                if(conditions.OR[i].values[0] == conditionsDescriptor.OR[j].values[0]){
                  checked = true;
                }
              }
            }
          }
        }
      }
      if(checked){
        console.log(effectsDescriptor.selector);
        console.log(effectsDescriptor.affordanceType);
        console.log(effectsDescriptor.affordanceName);
      }
    }
  }
}

checkConditions(conditions1);
checkConditions(conditions2);