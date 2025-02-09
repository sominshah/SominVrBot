const {comman, commandHandler} = require("../../handlers/handlePrefix")

module.exports ={
    name:"chatCreate",
    once:false,
    run: async (bot,user,message)=>{
        try
        {
            commandHandler(bot,user,message);        
        }catch(error)
        {
            console.error("[CHAT CREATE] [ERROR] ",error);
        }

    }
}