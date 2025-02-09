const fs = require("fs");
const path = require("path")

const commands = new Map();
const cooldowns = new Map();

const stringSimilarity = require("string-similarity")
console.log("[i]".cyan+" Loading Highrise Chat Commands: ");

const commandFolders = fs.readdirSync(path.join(__dirname,"../commands/chat"));

for (const folder of commandFolders)
{
    const commandFiles = fs.readdirSync(path.join(__dirname,`../commands/chat/${folder}`)).filter((file)=>file.endsWith(".js"));
    for(const file of commandFiles)
    {
        const command = require(`../commands/chat/${folder}/${file}`);
        commands.set(command.name,command);

        if(command.aliases)
        {
            for(const alias of command.aliases)
            {
                commands.set(alias,command)  //doubt
            }
        }
    }

}

const commandHandler = async (bot, user,message) =>{
    if(user.id===bot.info.user.id) return;
    const prefix  = bot.prefix.toLowerCase();
    const trimmedMessage = message.trim();

    if(!trimmedMessage?.toLowerCase().startsWith(prefix))return;

    const args = trimmedMessage.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = commands.get(commandName);

    if(!command && commandName.trim()!== " "){
        const filteredCommands = Array.from(commands.values()).filter(cmd=>cmd.category!== "private" || cmd.category!=="moderator");
        const commandNames = filteredCommands.map(cmd=>cmd.name);
        const similarCommands = stringSimilarity.findBestMatch(commandName,commandNames);
        const bestMatch = similarCommands.bestMatch.target;
        const similarity = similarCommands.bestMatch.rating;
        if(similarity >= 0.5)
        {
            return bot.whisper.send(user.id,`Command not found. Did you mean ${prefix}${bestMatch} ?`);
        }else{
            return;
        }
    }

    const developers= bot.developers;
    const moderators = bot.moderators;

    if(command.category && command.category === "private")
        {
            if(!developers.ids.includes(user.id)) return bot.whisper.send(user.id,`You don't have permission to use this command.`)
        }

    if(command.permission)
    {
        if(command.permission === "developer")
        {
            if(!developers.ids.includes(user.id)) return bot.whisper.send(user.id,`You don't have permission to use this command.`);
        }
        if(command.permission==="moderator")
        {
            if(!moderators.ids.includes(user.id) && !developers.ids.includes(user.id) ) return bot.whisper.send(user.id,`You don't have permission to use this command.`)            
         }
    }

   

    if(!developers.ids.includes(user.id)){
        if(!cooldowns.has(command.name))
        {
            cooldowns.set(command.name,new Map());
        }
        const now = Date.now();
        const timeStamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if(timeStamps.has(user.id)){
            const expirationTime = timeStamps.get(user.id) +cooldownAmount;
            if(now < expirationTime) {

                    const timeLeft = expirationTime - now;
                    const formatTime = bot.utils.msToTime(timeLeft);
                    return bot.whisper.send(user.id,`Please wait ${formatTime} before using the ${command.name} command.`);                    
            }        
        }

        timeStamps.set(user.id,now);
        setTimeout(()=>timeStamps.delete(user.id),cooldownAmount);

    } 

    try{
        command.run(bot,user,args,commands);
    }catch(err)
    {
        console.error("[commandHandler] [ERROR]: ",err)
        bot.whisper.send(user.id,`An error occured while executing the command.\n\nIf this issue persits, Please contact to a developer`)
    }


}


module.exports = {commandHandler};