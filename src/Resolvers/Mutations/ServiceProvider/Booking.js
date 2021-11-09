//const mongoose=require('mongoose');
module.exports={
    confirmBooking:async (parent,{id},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        if (!provider && !moderator){
            throw new Error("You didn't have a previlage");
        }
        try{
            models.Booking.updateOne({_id:id},{$set:{state:"confirmed"}},function (err,docs){
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
            throw new Error("block failed");
        }
    },
    cancelBooking: async (parent,{id},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        if (!provider && !moderator){
            throw new Error("You didn't have a previlage");
        }
        try{
            models.Booking.updateOne({_id:id},{$set:{state:"cancelled"}},function (err,docs){
                if (err){
                    console.log(err);
                    return false;
                }
                else{
                    console.log(docs);
                    return true;
                }

            });

        }catch (err){
            console.log(err);
            throw new Error("block failed");
        }
    }
}
