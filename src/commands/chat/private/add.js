module.exports ={

    name:"add",
    cooldown: 1,  //one second cool down duration for this command
example:"{{prefix}}add [subcommand] @[user]",
description:"Add a user as a moderator or a designer.",
category:"private",
run: async(bot,user,args)=>{
    try
    {
        const prefix =  bot.prefix;

            const options = ['moderator','designer'];
            const option = args[0]?.toLocaleLowerCase();
            if(!option || !options.includes(option))
            {
                //moderator, designer
                return bot.whisper.send(user.id,`Please provide an option.\n\n Example: "${prefix}add moderator @username"\n\n Options:${options.join(", ")}`)
            }

            const target = args[1];
            if(!target || !target.startsWith("@"))
            {
                return bot.whisper.send(user.id,`Please mention a user. \n\nExample:   "${prefix}add ${option} @username"`)
            }

            const target_id = await bot.room.players.id(target.replace("@",""));
            if(!target_id) return bot.whisper.send(user.id,`${target} is not in the room!`);

            if(option === "moderator") return bot.player.moderator.add(target_id);
            if(option === "designer") return bot.player.designer.add(target_id);
         
         
            bot.whisper.send(target_id,`@${user.username} added you as a ${option}`);
            bot.message.send(`${user.username} added ${target} as a ${option}`);

    }catch(err)
    {

    }
}

}