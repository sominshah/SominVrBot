const fs = require("fs");
const path = require("path");
module.exports = (bot)=>{
    const eventsDir = path.join(__dirname,"../events");
    const clientEvents = [];

    fs.readdirSync(path.join(eventsDir,'client')).forEach(file=>{
        const eventPath = path.join(eventsDir,'client',file);
        const event = require(eventPath);
        if(event.once === true)
        {
            bot.once(event.name,(...args)=> event.run(bot,...args));
        }else{
            bot.on(event.name,(...args)=> event.run(bot,...args));
        }
        clientEvents.push({
            Event:file,
            Status:"✅"


        })
    });

    console.info("\x1b[36m%s\x1b[m","Loading Highrise Client Events.");
    console.table(clientEvents, ["Event", "Status"]);
    


    const serverEvents = [];

    fs.readdirSync(path.join(eventsDir,'server')).forEach(file=>{
    
        const eventPath = path.join(eventsDir,'server',file);
        const event = require(eventPath);
        if(event.once === true)
        {
            bot.once(event.name,(...args)=> event.run(bot,...args));
        }else{
            bot.on(event.name,(...args)=> event.run(bot,...args));
        }


        serverEvents.push({
            Event:file,
            Status:"✅"


        })
    });

    console.info("\x1b[36m%s\x1b[m","Loading Highrise Server Events.");
    console.table(serverEvents, ["Event", "Status"]);

}