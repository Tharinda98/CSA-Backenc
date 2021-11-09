module.exports={
    appointment:async (parent,{booking,appointment_id,starting_date,duration,worker,cost},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        if (!provider && !moderator){
            throw new Error("You didn't have a previlage");
        }
        try{
            return models.Appointment.create({
                booking: booking,
                appointment_id: appointment_id,
                starting_date: starting_date,
                duration: duration,
                worker: worker,
                cost:cost
            });
        }catch (err){
            throw new Error("Error in making Appointment");
        }
    },
    initiateAppointment:async (parent,{appointment_id},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        if (!provider && !moderator && !worker){
            throw new Error("You didn't have a previlage");
        }
        try{
            models.Appointment.updateOne({appointment_id:appointment_id},{$set:{state:"going"}},function (err,docs){
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
            throw new Error("Initiate Failed");
        }
    },
    finishAppointment:async (parent,{appointment_id},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        if (!provider && !moderator && !worker){
            throw new Error("You didn't have a previlage");
        }
        try{
            models.Appointment.updateOne({appointment_id:appointment_id},{$set:{state:"finished",finish_date:Date.now()}},function (err,docs){
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
            throw new Error("Failed to Finish");
        }
    },
    assignWorker:async (parent,{appointment,worker},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        if (!provider && !moderator ){
            throw new Error("You cannot do this");
        }
        try{
            models.Appointment.updateOne({_id:appointment},{$push:{worker:worker}},function(err,docs){
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
