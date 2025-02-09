module.exports = {
name:"say",
cooldown: 1,  //one second cool down duration for this command
example:"{{prefix}}say [input]",
description:"Make the bot say something.",
category:"private",
run: async (bot,user,args) =>{
    try
    {
        const prefix =  bot.prefix;
        const messageToSend = args.join(" ");
        if(!messageToSend) return bot.whisper.send(user.id,`Please provide an input.\nExample: "${prefix}say This is me"`)
        return bot.message.send(messageToSend)
    }catch(err)
    {
        console.error("An error occured: ",err);
        return bot.whisper.send(user.id,`Something went wrong`);
    }
}

}