module.exports={
    addToCustomerNotification: async (parent,{customer,message},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        if (!provider && !moderator && !worker){
            throw new Error("You didn't have a previlage");
        }
        try{
            return models.NotificationCustomer.create({
                customer:customer,
                message:message
            });
        }catch (err){
            console.log(err);
            throw new Error("Sending notification to Customer Failed");
        }
    },
    addToWorkerNotification: async (parent,{worker,message},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        if (!provider && !moderator){
            throw new Error("You didn't have a previlage");
        }
        try{
            return models.NotificationWorker.create({
                worker:worker,
                message:message
            });
        }catch (err){
            console.log(err);
            throw new Error("Sending notification to Worker Failed");
        }
    },
    ServiceProviderReadNotification:async (parent,{id},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        if (!provider && !moderator){
            throw new Error("You didn't have a previlage");
        }
        try{
            models.NotificationSP.updateOne({_id:id},{$set:{state:"closed"}},function (err,docs){
                if (err){
                    console.log(err);
                }
                else{
                    console.log(docs);
                }

            });
            return true;
        }catch (err){
            console.log(err);
            throw new Error("notification didn't read");
        }
        //need to check sp..
    }
}
