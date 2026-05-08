const config = require('./config.json');
const pull = require('./pull.js');
const push = require('./push.js');

const startDrawbridge = async () => {
    console.log('[index] Starting Arrowhead Drawbridge...');
    console.log(`[index] Mode: pull=${config.mode.pull}, push=${config.mode.push}`);

    if (!config.mode.pull && !config.mode.push) {
        console.error('[index] No mode enabled in config. Set pull or push to true in config.json.');
        process.exit(1);
    }

    if (config.mode.pull) {
        console.log('[index] Starting in PULL mode...');
        await pull();
    } else if (config.mode.push) {
        console.log('[index] Starting in PUSH mode...');
        await push();
    }
}

startDrawbridge();