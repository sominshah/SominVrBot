require("dotenv").config();
const {Highrise, Events, Reactions,Emotes, Facing} = require("highrise.sdk.dev")
const config = require("./config")
const bot = new Highrise({
Events:[Events.Messages,Events.DirectMessages,Events.Joins,Events.Leaves,Events.Emotes,Events.Reactions,Events.Tips],
Cache: true,
AutoFetchMessages:true

});  

bot.config = config.settings;
bot.prefix = config.settings.prefix;
bot.developers = config.settings.developers;
bot.moderators = config.settings.moderators;
bot.floors = config.auth.room.floors
bot.utils = require("./src/utils/utils")
const handleEvents = require("./src/handlers/handleEvents");
global.activeLoops = new Map();
//clear active loop map in every 24 hours.
setInterval(() => global.activeLoops.clear(), 24 * 60 * 60 * 1000);
handleEvents(bot);
bot.on("error",(message)=>{
    console.log(message)
});
process.on('unhandledRejection',async(err,promise)=>{
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`)
    console.error(promise);
    global.activeLoops.clear();
})
bot.login(process.env.BOT_TOKEN, config.auth.room.id);



const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
const PORT = process.env.PORT || 3000;  // Use dynamic port for deployment
app.listen(PORT, () => console.log(`Keep-alive server running on port ${PORT}`));