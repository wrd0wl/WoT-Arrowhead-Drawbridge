const server = require('./server');
const factory = require('./factory/tdFactory.js');
const util = require('./utils');

const createWot = async (data, index) => {
    console.log(`[wot] Creating thing: ${data.selector}`);
    const td = factory(data, index);
    let setData = data.value;

    if (typeof server.getServer() === 'undefined') {
        await server.startServer();
    }

    let serverInit = server.getServer();
    let thing = await serverInit.produce(td);
    await thing.writeProperty(util.getProperty(data.selector), data.value);
    await thing.setPropertyReadHandler(util.getProperty(data.selector), async () => setData);

    if (util.checkIfInteger(util.getDeviceType(data.selector))) {
        await thing.setActionHandler("ChangeValue", async (params) => {
            console.log(`[wot] ChangeValue on ${data.selector}: ${setData} → ${params}`);
            setData = params;
            return undefined;
        });
    }

    if (util.checkIfBoolean(util.getDeviceType(data.selector))) {
        await thing.setActionHandler("PowerOff", async () => {
            console.log(`[wot] PowerOff on ${data.selector}`);
            setData = false;
            return undefined;
        });
        await thing.setActionHandler("PowerOn", async () => {
            console.log(`[wot] PowerOn on ${data.selector}`);
            setData = true;
            return undefined;
        });
    }

    await thing.expose();
    console.log(`[wot] Thing exposed: ${data.selector}`);
}

module.exports = createWot;