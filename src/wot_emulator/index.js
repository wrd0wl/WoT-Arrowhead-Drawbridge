const jsonDevices = require('./devices.json');
const config = require('./config.json');
const wot = require('./wot.js');
const util = require('./utils.js');
const requests = require('./requests.js');
const ahFactory = require('./factory/ahFactory.js');
const test = require('./test.js');

const startWot = async () => {
    console.log('[index] Starting WoT Emulator...');
    console.log(`[index] Devices to register: ${jsonDevices.length}`);

    const res = await requests.getAH();
    const data = res.data.data.data;

    for (let i = 0; i < jsonDevices.length; i++) {
        console.log(`[index] Creating WoT thing for: ${jsonDevices[i].selector}`);
        await wot(jsonDevices[i], i + 1);

        if (!util.checkIfWotExists(data, jsonDevices[i])) {
            console.log(`[index] Registering in Arrowhead: ${jsonDevices[i].selector}`);
            await requests.postToAHS(ahFactory(jsonDevices[i].selector, i + 1));
        } else {
            console.log(`[index] Already registered in Arrowhead: ${jsonDevices[i].selector}`);
        }
    }

    console.log('[index] All devices initialized');

    if (config.test) {
        console.log('[index] Starting test simulation...');
        await test();
    }
}

startWot();