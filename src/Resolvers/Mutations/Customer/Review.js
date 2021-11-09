module.exports={
    sendReview:async (parent,{to,rating,content},{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("YOu have to log in to our system");
        }
        return models.CustomerReview.create({
            by:user.id,
            to:to,
            rating:rating,
            content:content
        })
    },
    updateCustomerReview:async (parent,{CustomerReview},{models})=>{
        const review=await models.CustomerReview.findById(CustomerReview);
        if (!review){
            throw new Error("Review didn't send correctly");
        }
        const provider=await models.ServiceProvider.findById(review.to);
        if (!provider){
            throw new Error("Provider didn't exist");
        }
        const no_of_vote=provider.no_of_vote;
        const rating=provider.rating;
        const new_rating=(rating*no_of_vote+review.rating)/(no_of_vote+1)
        try{
            models.ServiceProvider.updateOne({_id:provider._id},{$set:{no_of_vote:no_of_vote+1,rating:new_rating}},function(err,docs){
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

