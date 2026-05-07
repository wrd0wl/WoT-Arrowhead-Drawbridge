const config = require('./config.json');

const pull = require('./pull.js');

const push = require('./push.js');

const startDrawbridge = async () =>{
    
    if(!config.mode.pull && !config.mode.push){
        console.error('No mode enabled in config. Set pull or push to true in config.json.');
        process.exit(1);
    }

    if(config.mode.pull){
        await pull();
    }
    else if(config.mode.push){
       await push();
    }
}

startDrawbridge();

