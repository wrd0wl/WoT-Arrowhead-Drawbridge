const requests = require('./requests.js');
const util = require('./utils.js');
const config = require('./config.json');

let devices = [];

const startTest = async () => {
    console.log('[test] Starting simulation...');
    const res = await requests.getAH();

    if (!res || !res.data || !res.data.data) {
        console.error('[test] Failed to get service list from Arrowhead');
        return;
    }

    devices = await findWot(res.data.data.data) || [];

    // Only integer devices (accl, temp) have ChangeValue action
    devices = devices.filter(item =>
        item?.serviceDefinition?.serviceDefinition &&
        util.checkIfInteger(item.serviceDefinition.serviceDefinition)
    );

    if (devices.length === 0) {
        console.error('[test] No accl/temp devices found for simulation');
        return;
    }

    console.log(`[test] Devices available for simulation: ${devices.length}`);
    await randomdev();
}

const findWot = async (data) => {
    let wotdevices = [];
    for (let i = 0; i < data.length; i++) {
        if (util.checkMetadata(data[i])) {
            let device = await requests.checkUrlDevice(data[i]);
            if (device != undefined) {
                wotdevices.push(data[i]);
            }
        }
    }
    return wotdevices;
}

const randomdev = async () => {
    if (devices.length === 0) {
        console.error('[test] Device list is empty, stopping simulation');
        return;
    }

    const numdev   = Math.floor(Math.random() * devices.length);
    const numvalue = Math.floor(Math.random() * 101);

    console.log(`[test] Sending value ${numvalue} to ${devices[numdev].serviceUri}`);
    await requests.postWoTvalue(devices[numdev], numvalue);

    if (config.mode.push) {
        await requests.notifyDevice();
    }

    setTimeout(randomdev, Math.floor(Math.random() * config.interval));
}

module.exports = startTest;