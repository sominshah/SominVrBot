
module.exports = {
    name:"test",
    category:"public",
    run:async (bot,user,args)=>{

        try{

            if(!bot.moderators.usernames.includes(user.username)) return bot.whisper.send(user.id,`You don't have permissions to use this command.`);
            bot.message.send(`This is a test command`);

        }catch(error)
        {
            console.log("[COMMAND] [TEST] [ERROR]: "+error);
        }
    }
}