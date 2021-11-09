module.exports={
    sendRatingToWorker: async (parent,{worker,rating},{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot query this");
        }
        const workers=await models.Worker.findById(worker);
        if (!workers){
            throw new Error("Worker didn't exist");
        }
        const no_of_vote=workers.no_of_vote;
        const new_rating=(workers.rating*no_of_vote+rating)/(no_of_vote+1);
        try{
            models.Worker.updateOne({_id:worker},{$set:{no_of_vote:no_of_vote+1,rating:new_rating}},function(err,docs){
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
