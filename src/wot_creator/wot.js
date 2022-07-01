const server = require('./server');
const factory = require('./factory/tdFactory.js');
const util = require('./utils');


const createWot = async (data, index) =>{
    const td = factory(data, index);
    let setData = data.value;
    if (typeof server.getServer() === 'undefined'){
        server.startServer();
    }

    let serverInit = await server.getServer();
    let thing = await serverInit.produce(td);
    await thing.writeProperty(util.getProperty(data.selector), data.value);

    if(util.getDeviceType(data.selector) == 'plug'){
        await thing.setPropertyReadHandler(util.getProperty(data.selector), async () => setData);
        await thing.setActionHandler("HardPowerOff", async() =>{
            setData = false;
            return undefined;
        });
        await thing.setActionHandler("SoftPowerOff", async() =>{
            setData = false;
            return undefined;
        });
    }
    await thing.expose();
}

module.exports = createWot;