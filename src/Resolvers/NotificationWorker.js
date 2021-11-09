module.exports = {
    worker:async (NotificationWorker,args,{models})=>{
        try{
            return models.Worker.findById(NotificationWorker.worker);
        }catch (err){
            console.log(err);
            throw new Error("Worker id not identified");
        }
    }

}
