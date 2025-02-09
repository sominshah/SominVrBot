module.exports ={

    settings:{
        prefix:"!",

    //moderator can use moderation commands like kicking people.    
        moderators:{
            ids:["672f9b545f1dc095d7ca8e59"],//every users id we need. We can get it using web api (https://webapi.highrise.game/users?username=SominVr)
            usernames:["SominVr"]
        },

    //developers can use controling commands like controling the bot configure commands.    
        developers:{
            ids:["672f9b545f1dc095d7ca8e59"],//every users id we need. We can get it using web api (https://webapi.highrise.game/users?username=SominVr)
            usernames:[]
        }
    },
        auth:{
            token:"",
            room: {
                id: "673b643f16c325bf7175d7fe",
                floors:[{x: 7.5, y:4, z:2 },{ x: 7.5, y: 5, z: 5 },{ x: 10, y: 10, z: 10 }]                
            }

        }


    
}