module.exports={
    WorkerReadNotification:async (parent,{id},{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot read this msg");
        }
        try{
            models.NotificationWorker.updateOne({_id:id},{$set:{state:"closed"}},function (err,docs){
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
        //need to check worker..
    }
}
