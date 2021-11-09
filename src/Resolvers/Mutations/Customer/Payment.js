module.exports={
    payment:async (parent,{from,to,appointment,amount},{models})=>{
        try{
            return models.Payment.create({
                from:from,
                to:to,
                appointment:appointment,
                amount:amount
                }
            );
        }catch (err){
            console.log(err);
            throw new Error("Payment Registered Failed")
        }
    },
    confirmPayment:async (parent,{appointment},{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot do this");
        }
        try{
            models.Appointment.updateOne({_id:appointment},{$set:{paid:true}},function(err,docs){
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
