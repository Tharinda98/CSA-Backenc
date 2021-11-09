const mongoose=require('mongoose');
module.exports={
    worker_workStats:async (parent,args,{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("you cannot query this");
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
                            _id: '$state',
                            Count: {
                                $sum: 1
                            }
                        }
                },
                {
                    $sort:
                        {
                            _id: 1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching");
        }
    }
}
