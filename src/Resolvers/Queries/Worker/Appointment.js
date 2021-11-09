const mongoose=require('mongoose');
module.exports={
    worker_getMyAssignedWorks:async (parent, {offset,page},{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You have to be a worker");
        }
        try{
            if (page === 1) {
                return models.Appointment.aggregate([
                    {
                        $unwind:
                            {
                                path: "$worker"
                            }
                    },
                    {
                        $match:
                            {
                                worker:mongoose.Types.ObjectId(user.id)
                            }
                    },
                    {
                        $sort:
                            {
                                starting_date: -1
                            }
                    },
                    {
                        $limit: offset
                    }
                ]);
            } else if (page > 1) {
                return models.Appointment.aggregate([
                    {
                        $unwind:
                            {
                                path: "$worker"
                            }
                    },
                    {
                        $match:
                            {
                                worker:mongoose.Types.ObjectId(user.id)
                            }
                    },
                    {
                        $sort:
                            {
                                starting_date: -1
                            }
                    },
                    {
                        $skip: offset * (page - 1)

                    },
                    {
                        $limit: offset
                    }
                ]);
            }
        }catch (err){
            console.log(err);
            throw new Error("Action Failed");
        }
    },
    worker_getMyOngoingWorks: async (parent,{offset,page},{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot query this");
        }
        try{
            if (page === 1) {
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
                                }
                            ]
                        }
                    },
                    {
                        $sort:
                            {
                                starting_date: -1
                            }
                    },
                    {
                        $limit: offset
                    }
                ]);
            } else if (page > 1) {
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
                                    }
                                ]
                        }
                    },
                    {
                        $sort:
                            {
                                starting_date: -1
                            }
                    },
                    {
                        $skip: offset * (page - 1)

                    },
                    {
                        $limit: offset
                    }
                ]);
            }
        }catch (err){
            console.log(err);
            throw new Error("Action Failed");
        }
    },
    worker_getMyFinishedWorks: async (parent,{offset,page},{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot query this");
        }
        try{
            if (page === 1) {
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
                                    }
                                ]
                        }
                    },
                    {
                        $sort:
                            {
                                starting_date: -1
                            }
                    },
                    {
                        $limit: offset
                    }
                ]);
            } else if (page > 1) {
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
                                    }
                                ]
                        }
                    },
                    {
                        $sort:
                            {
                                starting_date: -1
                            }
                    },
                    {
                        $skip: offset * (page - 1)

                    },
                    {
                        $limit: offset
                    }
                ]);
            }
        }catch (err){
            console.log(err);
            throw new Error("Action Failed");
        }
    }
}
