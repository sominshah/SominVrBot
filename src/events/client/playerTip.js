const { Emotes } = require("highrise.sdk.dev");
module.exports ={
    name: "playerTip",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run: async (bot,sender,receiver,tip)=>
        {
            try
            { 
                console.log(`${sender.username} sent ${tip.amount} ${tip.type} to ${receiver.username}`);

                if(receiver.id === bot.info.user.id)
                {
                    bot.whisper.send(sender.id,`Thank you for the tip.`);
                    bot.player.emote(sender.id,Emotes.Teleporting.id);
                }

            }catch(error)
            {
                console.error("[PLAYER TIP] [ERROR] ",error)
            }
    }
}