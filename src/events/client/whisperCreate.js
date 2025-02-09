module.exports ={
    name:"whisperCreate",
    once:false,
    run: async (bot,user,message)=>{

        try
        {
            console.log(`[WHISPER] ${user.username}:${user.id} - ${message}`)
        }catch(error)
        {
            console.error("[WHISPER CREATE] [ERROR] ",error);
        }


    }
}