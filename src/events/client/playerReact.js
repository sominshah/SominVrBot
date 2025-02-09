module.exports ={
    name: "playerReact",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run: async (bot,sender,receiver,reaction_id)=>
        {
            try
            { 
            console.log(`${sender.username} sent a ${reaction_id} to ${receiver}`);
            }catch(error)
            {
                console.error("[PLAYER REACT] [ERROR] ",error)
            }
    }
}