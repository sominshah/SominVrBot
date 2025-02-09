module.exports ={
    name: "playerJoin",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run: async (bot, user,position)=>
        {
            try
            { 
            
            console.log(`${user.username} Joined the room!!`)
            bot.message.send(`Hello @${user.username}, welcome the room ${bot.auth.room.name}! `);



            if (global.activeLoops.has(user.id)) {
                clearTimeout(global.activeLoops.get(user.id)); 
                global.activeLoops.delete(user.id);
                return;
            }


            }catch(error)
            {
                console.error("[PLAYER JOIN] [ERROR] ",error)
            }

    }
}