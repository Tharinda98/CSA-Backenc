const mongoose=require('mongoose');
module.exports={
    worker_SearchMyOngoingWorks: async (parent,{id},{models,user})=>{
        const reid=new RegExp(id,'i');
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot query this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $unwind:
                        {
                            path: "$worker"
                        }
                },
                {
                    $match:{
                        $and:
                            [
                                {
                                    worker:mongoose.Types.ObjectId(user.id)
                                },
                                {
                                    state:"going"
                                },
                                {
                                    appointment_id:
                                        {
                                            $regex:reid
                                        }

                                }
                            ]
                    }
                }
                ]);
        }catch (err){
            console.log(err);
            throw new Error("Action Failed");
        }
    },
    worker_SearchMyFinishedWorks: async (parent,{id},{models,user})=>{
        const reid=new RegExp(id,'i');
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot query this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $unwind:
                        {
                            path: "$worker"
                        }
                },
                {
                    $match:{
                        $and:
                            [
                                {
                                    worker:mongoose.Types.ObjectId(user.id)
                                },
                                {
                                    state:"finished"
                                },
                                {
                                    appointment_id:
                                        {
                                            $regex:reid
                                        }

                                }
                            ]
                    }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Action Failed");
        }
    },
    worker_SearchMyWorks:async (parent,{id},{models,user})=>{
        const reid=new RegExp(id,"i");
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot query this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $unwind:
                        {
                            path: "$worker"
                        }
                },
                {
                    $match:{
                        $and:
                            [
                                {
                                    worker:mongoose.Types.ObjectId(user.id)
                                },
                                {
                                    appointment_id:
                                        {
                                            $regex:reid
                                        }

                                }
                            ]
                    }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Search Failed")
        }
    }
}
