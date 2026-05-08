const path = require('path');
const fs = require('fs');
const util = require('./utils.js');
const requests = require('./requests.js');
const directoryPath = path.join(__dirname, 'descriptors');

let devices = [];

const rulesControl = async () => {
    console.log('[control] Starting rules control cycle');
    try {
        await getDevices();
    } catch (err) {
        console.error('[control] Failed to get devices:', err.message);
        return;
    }

    console.log(`[control] Devices found: ${devices.length}`);
    if (devices.length === 0) return;

    const descriptors = readFiles(directoryPath);
    console.log(`[control] Descriptors loaded: ${descriptors.length}`);

    for (let i = 0; i < descriptors.length; i++) {
        try {
            const trigger = descriptors[i].triggers[0];
            if (!trigger || !trigger.conditions || !trigger.effects) {
                console.error(`[control] Descriptor ${i}: invalid structure, skipping`);
                continue;
            }

            const conditionsDescriptor = trigger.conditions;
            const effectsDescriptor = trigger.effects;
            let checkedProperty = false;

            if ('AND' in conditionsDescriptor) {
                if (conditionsDescriptor.AND.length === 0) {
                    console.warn(`[control] Descriptor ${i}: empty AND array, skipping`);
                    checkedProperty = false;
                } else {
                    checkedProperty = true;
                    for (let j = 0; j < conditionsDescriptor.AND.length; j++) {
                        if (!await checkProperties(conditionsDescriptor.AND[j])) {
                            checkedProperty = false;
                        }
                    }
                }
            } else if ('OR' in conditionsDescriptor) {
                for (let j = 0; j < conditionsDescriptor.OR.length; j++) {
                    if (await checkProperties(conditionsDescriptor.OR[j])) {
                        checkedProperty = true;
                    }
                }
            } else {
                checkedProperty = await checkProperties(conditionsDescriptor);
            }

            console.log(`[control] Descriptor ${i}: condition met = ${checkedProperty}`);

            if (checkedProperty) {
                await effects(effectsDescriptor);
            }
        } catch (err) {
            console.error(`[control] Error processing descriptor ${i}:`, err.message);
        }
    }
}

const checkProperties = async (condition) => {
    let checkedSelector = true;
    for (let i = 0; i < devices.length; i++) {
        if (util.checkSelector(devices[i], condition)) {
            let deviceProperty = await requests.getPropertyValue(devices[i], condition);
            if (deviceProperty == undefined || !util.checkProperty(deviceProperty, condition)) {
                checkedSelector = false;
            }
        }
    }
    return checkedSelector;
}

const effects = async (effectsDescriptor) => {
    for (let i = 0; i < devices.length; i++) {
        for (let j = 0; j < effectsDescriptor.length; j++) {
            if (util.checkSelector(devices[i], effectsDescriptor[j])) {
                console.log(`[control] Applying effect: ${effectsDescriptor[j].affordanceName} → ${devices[i].serviceUri}`);
                await requests.postEffects(devices[i], effectsDescriptor[j]);
            }
        }
    }
}

const readFiles = (dir) => {
    if (!fs.existsSync(dir)) {
        console.error('[control] Descriptors folder not found:', dir);
        return [];
    }

    var files = [];
    fs.readdirSync(dir).forEach((name, index) => {
        if (fs.statSync(path.join(dir, name)).isDirectory()) return;
        try {
            files[index] = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
            console.log(`[control] Loaded descriptor: ${name}`);
        } catch (err) {
            console.error(`[control] Failed to parse descriptor ${name}:`, err.message);
        }
    });
    return files.filter(Boolean);
}

const getDevices = async () => {
    console.log('[control] Fetching devices from Arrowhead...');
    const res = await requests.getAH();
    devices = await findWot(res.data.data.data);
}

const findWot = async (data) => {
    let wotdevices = [];
    for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const metaOk = util.checkMetadata(d);
        if (metaOk) {
            let device = await requests.checkUrlDevice(d);
            if (device != undefined) {
                console.log(`[control] Device reachable: ${d.serviceUri}`);
                wotdevices.push(d);
            } else {
                console.warn(`[control] Device not reachable: ${d.serviceUri}`);
            }
        }
    }
    return wotdevices;
}

module.exports = {
    rulesControl
}