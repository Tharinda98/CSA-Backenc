const mongoose=require('mongoose');
module.exports ={
    getMyNotification:async (parent, {offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot Query this");
        }
        try{
            if (page===1){
                return models.NotificationSP.aggregate([
                    {
                        $match:
                            {
                                serviceProvider:mongoose.Types.ObjectId(sp_id)
                            }
                    },
                    {
                        $sort:
                            {
                                date: -1
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
                return models.NotificationSP.aggregate([
                    {
                        $match:
                            {
                                serviceProvider:mongoose.Types.ObjectId(sp_id)
                            }
                    },
                    {
                        $sort:
                            {
                                date: -1
                            }
                    },
                    {
                        $skip:offset*(page-1)

                    },
                    {
                        $limit:offset
                    }
                ]);
            }
        }catch (err){
            console.log(err);
            throw new Error("Error in fetching notification");
        }

    },
    getWorkerNotification: async (parent,{worker,offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot Query this");
        }
        try{
            if (page===1){
                return models.NotificationWorker.aggregate([
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
                                path: "$Worker"
                            }
                    },
                    {
                        $match:
                            {
                                $and:
                                    [
                                        {
                                            worker:mongoose.Types.ObjectId(worker)
                                        },
                                        {
                                            "Worker.serviceProvider":mongoose.Types.ObjectId(sp_id)
                                        }
                                    ]
                            }
                    },
                    {
                        $sort:
                            {
                                date: -1
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
                return models.NotificationWorker.aggregate([
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
                                path: "$Worker"
                            }
                    },
                    {
                        $match:
                            {
                                $and:
                                    [
                                        {
                                            worker:mongoose.Types.ObjectId(worker)
                                        },
                                        {
                                            "Worker.serviceProvider":mongoose.Types.ObjectId(sp_id)
                                        }
                                    ]
                            }
                    },
                    {
                        $sort:
                            {
                                date: -1
                            }
                    },
                    {
                        $skip:offset*(page-1)

                    },
                    {
                        $limit:offset
                    }
                ]);
            }
        }catch (err){
            console.log(err);
            throw new Error("Source not found");
        }
    }
}
