module.exports ={
    name: "messageCreate",
    once: false,  // if it true which means this event will occur once in complete app life cycle.
    run:(bot, user_id,data,message)=>
        {
            try{

                console.log(`[Direct Message]: ${user_id} ${data.id} - ${message}`)
const conversationId = data.id;

const messageLower = message.toLowerCase();

// Regular expression to match variations of "hi", "hello", "hey", etc.
const greetingRegex = /\b(hi+|hello+|hey+|hii+|hell+o+)\b/;

// Check if the message matches the greeting pattern
if (greetingRegex.test(messageLower)) {
    bot.direct.send(conversationId,`Hello there!`);

} else if (/assalam[ ]?alaikum/.test(messageLower)) {
    bot.direct.send(conversationId,`Wa alaikum assalam!`);
}

            }catch(error)
            {
                console.error("[MESSAGE CREATE] [ERROR]",error)
            }



    }
}