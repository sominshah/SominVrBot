//const { Emotes } = require("highrise.sdk.dev");
module.exports =
{
    name: "playerEmote",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run: async (bot,sender,receiver,emote)=>
        {
            try
            { 
                


                console.log(`${sender.username} performed an emote on ${receiver.username} - "${emote}"`);
            }catch(error)
            {
                console.error("[PLAYER EMOTE] [ERROR] ",error)
            }
    }
}