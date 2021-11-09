const mongoose=require('mongoose');
module.exports={
    getCountAssignedAppointments:async (parent,args,{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot query this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $lookup:
                        {
                            from: 'workers',
                            localField: 'worker',
                            foreignField: '_id',
                            as: 'Worker'
                        }
                },
                {
                    $unwind:
                        {
                            path:"$Worker"
                        }
                },
                {
                    $match:
                        {
                            "Worker._id":mongoose.Types.ObjectId(user.id)
                        }
                },
                {
                    $group:
                        {
                            _id: "$state",
                            Count: {
                                $sum: 1
                            }
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    }
}
