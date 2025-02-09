/**This even happens when bot is ready */

const { Facing } = require("highrise.sdk.dev");
module.exports ={
    name: "ready",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run:(bot, session)=>{
        console.log("The bot is online".green);
        bot.move.walk(7.8,1,2,Facing.FrontRight)
    }
}