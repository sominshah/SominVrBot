const {Emotes} = require("highrise.sdk.dev")
module.exports = 
{
    name:"loop",
    category:"public",
    example:"{{prefix}}loop [Number 1-100]",
    description:"Make the user emote.",    
    cooldown:3,
    run:async (bot,user,args)=>{
        try
        {

            if (!args.length) {
                return bot.whisper.send(user.id, `⚠️ Please provide a number between 1-100.\n\nExample: "${bot.prefix}loop 1"`);
            }

            // Extract the first number found
            const number = args.join("").match(/\d+/)?.[0];

            // Check if a valid number is found
            if (!number) {
                return bot.whisper.send(user.id, `⚠️ No valid number found. Please enter a number between 1-100.\n\nExample: "${bot.prefix}loop 1"`);
            }

            const parsedNumber = Number(number);

            // Validate the range (1-100)
            if (parsedNumber < 0 || parsedNumber > 100) {
                return bot.whisper.send(user.id, `⚠️ Number out of range. Please enter a number between 1-100.\n\nExample: "${bot.prefix}loop 1"`);
            }


                if (global.activeLoops.has(user.id) && parsedNumber==0) 
                {
                    clearTimeout(global.activeLoops.get(user.id));
                    global.activeLoops.delete(user.id);
                    return;
                }                


                // Cancel any existing loop for this user before starting a new one
                if (global.activeLoops.has(user.id)) 
                {
                    clearTimeout(global.activeLoops.get(user.id));
                    global.activeLoops.delete(user.id);
                }                


                const emoteList = Object.values(Emotes);
                // Get index by looping through the emotes array
                const emoteIndex = (parsedNumber - 1) % emoteList.length;
                const emote = emoteList[emoteIndex];
            

        
                let count=0;
                const loopEmote = async () => {
                    if (count >= 100 || !global.activeLoops.has(user.id)) 
                        {
                        clearTimeout(global.activeLoops.get(user.id));
                        global.activeLoops.delete(user.id);
                        console.log(`Loop finished for ${user.id}. Remaining loops: ${global.activeLoops.size}`);
                        return;
                    }
                
                    try 
                    {
                        const userId = await bot.room.cache.id(user.username); // ✅ Await the user ID
                        if (userId === user.id) { 
                            bot.player.emote(user.id, emote.id);
                            count++;                
                            global.activeLoops.set(user.id, setTimeout(loopEmote, emote.duration * 1000));
                        } else {
                            console.log(`User ${user.id} not found in cache, stopping loop.`);
                            clearTimeout(global.activeLoops.get(user.id));
                            global.activeLoops.delete(user.id);
                        }
                    } catch (error) {
                        console.error(`Error fetching user ID: ${error}`);
                        clearTimeout(global.activeLoops.get(user.id));
                        global.activeLoops.delete(user.id);
                    }
                };

                // ✅ Start the loop immediately
                global.activeLoops.set(user.id, setTimeout(loopEmote, 0));
                bot.whisper.send(user.id, `✅ Loop started for emote: ${emote.id}. Use "${bot.prefix}loop 0" to cancel.`);
            return;             
        }catch(error)
        {
            console.log("[COMMAND] [LOOP] [ERROR]: "+error);
        }
    }
}