let number;

WoT.produce({
    title: "random",
    description: "Random number example Thing",
    support: "git://github.com/eclipse/thingweb.node-wot.git",
    properties:{
        number:{
            type: "integer",
            description: "Current random number"
        }
    },
    actions:{
        calcRandom:{
            description: "Calculate random number"
        }
    }
})
.then((thing) =>{
    console.log("Produced " + thing.getThingDescription().title);

    number = 0;

    thing.setPropertyReadHandler("number", async() => number);

    thing.setActionHandler("calcRandom", async() =>{
        const newRandom = Math.floor((Math.random() * 10) + 1);
        console.log("New random number between 1 and 10: " + newRandom);
        number = newRandom;
        return undefined;
    });

    thing.expose().then(() => {
        console.info(thing.getThingDescription().title + " ready");
    });
})
.catch((e) => {
    console.log(e);
});
