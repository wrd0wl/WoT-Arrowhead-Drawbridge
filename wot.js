const server = require('./server');
const factory = require('./factory');
const util = require('./utils');


const createWot = async (data) =>{
    const td = factory(data);
    if (typeof server.getServer() === 'undefined'){
        server.startServer();
    }

    let thing = await server.getServer();

    await thing.produce(td).then((exposedThing) =>{
        setData = data.value;
        exposedThing.writeProperty(util.getProperty(data.selector), data.value);
        if(util.getDeviceType(data.selector) == 'plug'){
            exposedThing.setPropertyReadHandler(util.getProperty(data.selector), async () => setData);
            exposedThing.setActionHandler("PowerOff", async() =>{
                setData = false;
                return undefined;
            });
        }
        exposedThing.expose();
    });
}



module.exports = createWot;