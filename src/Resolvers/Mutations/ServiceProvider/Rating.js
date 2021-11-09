module.exports={
    sendRatingToCustomer:async (parent,{Customer,rating},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        if (!provider && !moderator && !worker){
            throw new Error("U didn't have privilege");
        }
        const customer=await models.Customer.findById(Customer);
        if (!customer){
            throw new Error("Customer didn't exist");
        }
        const cus_rating=customer.rating;
        const no_of_vote=customer.no_of_vote;
        const new_rating=(cus_rating*no_of_vote+rating)/(no_of_vote+1);
        try{
            models.Customer.updateOne({_id:customer._id},{$set:{no_of_vote:no_of_vote+1,rating:new_rating}},function(err,docs){
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
