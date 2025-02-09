module.exports = {
    name:"reloadfile",
    category:"private",
    description:"Reload a file",
    usage:"reloadfile [file name]",
    run:async (bot,user,args)=>{

        try{

            const files = ['config','utils'];
            const file= args[0]?.toLowerCase();
             if(!file) return bot.whisper.send(user.id,`Please provide a file name.\n\nExample: "${bot.prefix}reloadfile config"`);
             if(!files.includes(file)) return bot.whisper.send(user.id,`Invalid file type.\n\n Available files: ${files.join(", ")}`);

            let path;
            switch(file)
            {
                case "config":
                    path = "../../../../config";
                    break;
                case "utils":
                    path = "../../../utils/utils";
                    break;
                default:
                    return bot.whisper.send(user.id,`The file ${file} does not exist.`)                    

            }

            delete require.cache[require.resolve(path)];
            const newFile = require(path)


            switch(file)
            {
                case "config":
                    bot.config = newFile.settings;
                    bot.prefix = newFile.settings.prefix;
                    bot.developers = newFile.settings.developers;
                    bot.moderators = newFile.settings.moderators;
                    break;
                case "utils":
                    bot.utils = newFile;
                    break;
                default:
                        return bot.whisper.send(user.id,`The file ${file} does not exist.`)

            }

            return bot.whisper.send(user.id,`The file ${file} has been reloaded!`)


        }catch(error)
        {
            console.log("[COMMAND] [RELOADFILE] [ERROR]: "+error);
            return bot.whisper.send(user.id,`Someting went wrong.`);
        }
    }
}