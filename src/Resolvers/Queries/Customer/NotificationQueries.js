const mongoose=require("mongoose");
module.exports = {
    customer_getMyNotification:async (parent,args,{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot Query this");
        }
        try{
            return models.NotificationCustomer.aggregate([
                {
                    $match:
                        {
                            customer:mongoose.Types.ObjectId(user.id)
                        }
                },
                {
                    $sort:
                        {
                            date:-1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error in fetching Notification");
        }
    }
}
