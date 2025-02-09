module.exports ={
    name: "playerLeave",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run: async (bot, user)=>
        {
            try
            { 
            
            console.log(`${user.username} Left the room!!`)
            bot.message.send(`Good Bye! @${user.username}, Please come again 👋🏻`); 
            
 
            
            if (global.activeLoops.has(user.id)) {
                clearTimeout(global.activeLoops.get(user.id)); 
                global.activeLoops.delete(user.id);
                return;
            }

            }catch(error)
            {
                console.error("[PLAYER LEAVE] [ERROR] ",error)
            }

    }
}