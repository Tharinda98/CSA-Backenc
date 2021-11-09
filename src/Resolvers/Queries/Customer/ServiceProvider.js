const mongoose=require('mongoose');
module.exports={
    getReviewsOfServiceProviders:async (parent,{provider},{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot do this");
        }
        try{
            return models.CustomerReview.aggregate([
                {
                    $match:
                        {
                            to:mongoose.Types.ObjectId(provider)
                        }
                },
                {
                    $sort:
                        {
                            rating:-1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    }
}
