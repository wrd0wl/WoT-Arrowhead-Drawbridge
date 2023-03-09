const config = require('./config.json');

const pull = require('./pull.js');

const push = require('./push.js');

const startDrawbridge = async () =>{
    if(config.mode.pull){
        await pull();
    }
    else if(config.mode.push){
       push();
    }
}

startDrawbridge();

