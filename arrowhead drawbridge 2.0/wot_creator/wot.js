const server = require('./server');
const factory = require('./tdFactory');
const util = require('./utils');


const createWot = async (data, index) =>{
    const td = factory(data, index);
    if (typeof server.getServer() === 'undefined'){
        server.startServer();
    }

    let thing = await server.getServer();

    await thing.produce(td).then((exposedThing) =>{
        let setData = data.value;
        exposedThing.writeProperty(util.getProperty(data.selector), data.value);
        if(util.getDeviceType(data.selector) == 'plug'){
            exposedThing.setPropertyReadHandler(util.getProperty(data.selector), async () => setData);
            exposedThing.setActionHandler("HardPowerOff", async() =>{
                setData = false;
                return undefined;
            });
            exposedThing.setActionHandler("SoftPowerOff", async() =>{
                setData = false;
                return undefined;
            });
        }
        exposedThing.expose();
    });
}



module.exports = createWot;