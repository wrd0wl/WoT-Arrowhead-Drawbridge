const config = require('./config.json');

const polling = require('./polling.js');

const push = require('./push.js');

const drawbridge = async () =>{
    if(config.mode.polling){
        await polling();
    }
    else if(config.mode.api){
        push();
    }
}

module.exports = drawbridge;
