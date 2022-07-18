const config = require('./config.json');

const polling = require('./polling.js');

const push = require('./push.js');

const startDrawbridge = async () =>{
    if(config.mode.polling && config.mode.push){
        await polling();
        push();
    }
    else if(config.mode.polling){
        await polling();
    }
    else if(config.mode.push){
        push();
    }
}

startDrawbridge();

