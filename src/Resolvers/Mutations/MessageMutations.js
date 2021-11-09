//const mongoose=require('mongoose');
module.exports={
    sendMessage: async (parent,{to,message},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        const customer=await models.Customer.findById(user.id);
        let user_name=null;
        if (provider){
            user_name=provider.username;
        }else if (moderator){
            user_name=moderator.username;
        }else if (worker){
            user_name=worker.username;
        }else if (customer){
            user_name=customer.username;
        }else{
            throw new Error("You have to signin to send message");
        }
        return models.Message.create({
            by:user_name,
            to:to,
            message:message
            }
        );
    },
    readMessage: async (parent,{id},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const customer=await models.Customer.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        let user_name=null;
        if (provider){
            user_name=provider.username;
        }else if (moderator){
            user_name=moderator.username;
        }else if (worker){
            user_name=worker.username;
        }else if (customer){
            user_name=customer.username;
        }else{
            throw new Error("You have to signin to send message");
        }
        try{
            models.Message.updateOne({_id:id,to:user_name},{$set:{read:true}},function(err,docs){
                if (err){
                    console.log(err);
                }else{
                    console.log(docs);
                }
            });
            return true;
        }catch (err){
            console.log(err);
            return false;
        }
    }
}
