const { Facing } = require("highrise.sdk.dev");
module.exports = 
{
    name:"teleport",
    category:"public",
    example: "{{prefix}}floor <floor_number>",
    description: "Teleports you to the specified floor.",
    cooldown: 3,
    run:async (bot,user,args)=>{
        try{
            if (!args[0] || isNaN(args[0])) 
            {
                return bot.whisper.send(user.id, "⚠️ Please provide a valid floor number. Example: !floor 1");
            }
            const floorNumber = parseInt(args[0]);

            const floorIndex = floorNumber - 1;   // Convert to 0-based index
            if (!bot.floors || !bot.floors[floorIndex]) {
                return bot.whisper.send(user.id, "⚠️ Invalid floor number. Please enter a valid floor (e.g., 1, 2, 3).");
            }
    
            const { x, y, z } = bot.floors[floorIndex];

            bot.player.teleport(user.id, x, y, z, Facing.FrontLeft)
            .then(() => bot.whisper.send(user.id, `✅ You have been teleported to ${floorNumber}!`))
            .catch(e => 
                {
                console.error(e);
                bot.whisper.send(user.id, "⛔ Teleportation failed. Please try again.");
            });            

        }catch(error)
        {
            console.log("[COMMAND] [FLOOR] [ERROR]: "+error);
        }
    }
}