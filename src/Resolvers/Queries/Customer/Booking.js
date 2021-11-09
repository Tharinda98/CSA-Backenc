const mongoose=require('mongoose');
module.exports={
    customer_getMyBookings: async (parent,args,{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You have to signin");
        }
        try{
            return models.Booking.aggregate([
                {
                    $match:
                        {
                            by:mongoose.Types.ObjectId(user.id)
                        }
                },
                {
                    $sort:
                        {
                            date: -1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    }
}
