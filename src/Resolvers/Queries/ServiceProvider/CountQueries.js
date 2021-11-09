const mongoose=require('mongoose');
module.exports={
    getCountWorkers: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            console.log("sp");
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot query this");
        }
        try{
            const op= models.Worker.aggregate([
                {
                    $match:
                        {
                            $and:
                            [
                                {
                                    serviceProvider:mongoose.Types.ObjectId(sp_id)
                                },
                                {
                                    left_date:null
                                }
                            ]
                        }
                },
                {
                    $lookup:
                        {
                            from: 'serviceproviders',
                            localField: 'serviceProvider',
                            foreignField: '_id',
                            as: 'SP'
                        }
                },
                {
                    $unwind:
                        {
                            path: "$SP"
                        }
                },
                {
                    $group:
                        {
                            _id: '$SP.username',
                            Count: {
                                $sum: 1
                            }
                        }
                }
            ]);
            console.log(op);
            return op;
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }

    },
    getCountAppointments: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            console.log("sp");
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot query this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $lookup:
                        {
                            from: 'bookings',
                            localField: 'booking',
                            foreignField: '_id',
                            as: 'Booking'
                        }
                },
                {
                    $unwind:
                        {
                            path: "$Booking"
                        }
                },
                {
                    $match:
                        {
                            "Booking.to":mongoose.Types.ObjectId(sp_id)
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
    },
    getCountBooking: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            console.log("sp");
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot query this");
        }
        try{
            return models.Booking.aggregate([
                {
                    $match:
                        {
                            to:mongoose.Types.ObjectId(sp_id)
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
    },
    getCountMessages: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        const customer=await models.Customer.findById(user.id);
        let name=null;
        if (provider){
            name=provider.username;
        }else if (moderator){
            name=moderator.username;
        }else if (worker) {
            name = worker.username;
        }else if (customer) {
            name = customer.username;
        }else{
            throw new Error("You cannot query this");
        }
        const rename=new RegExp(name,"i");
        try{
            return models.Message.aggregate([
                {
                    $match:
                        {
                            to:
                                {
                                    $regex:rename
                                }
                        }
                },
                {
                    $group:
                        {
                            _id: "$read",
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
    },
    getCountNotification:async (parent,args,{models,user})=>{
        try{
            const provider=await models.ServiceProvider.findById(user.id);
            const moderator=await models.Moderator.findById(user.id);
            const worker=await models.Worker.findById(user.id);
            const customer=await models.Customer.findById(user.id);
            if (provider){
                return models.NotificationSP.aggregate([
                    {
                        $match:
                            {
                                serviceProvider:mongoose.Types.ObjectId(user.id)
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
            }else if (moderator){
                const id=moderator.serviceProvider;
                return models.NotificationSP.aggregate([
                    {
                        $match:
                            {
                                serviceProvider:mongoose.Types.ObjectId(id)
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
            }else if (worker) {
                return models.NotificationWorker.aggregate([
                    {
                        $match:
                            {
                                worker:mongoose.Types.ObjectId(user.id)
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
            }else if (customer) {
                return models.NotificationCustomer.aggregate([
                    {
                        $match:
                            {
                                customer:mongoose.Types.ObjectId(user.id)
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
            }
        }catch (err){
            console.log(err);
            throw new Error("You cannot query this");
        }

    },
    getCountModerators: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        if (!provider){
            throw new Error("You cannot query this");
        }
        try{
            return models.Moderator.aggregate([
                {
                    $match:
                        {
                            $and:
                            [
                                {
                                    serviceProvider:mongoose.Types.ObjectId(user.id)
                                },
                                {
                                    left_date:null
                                }
                            ]
                        }
                },
                {
                    $lookup:
                        {
                            from: 'serviceproviders',
                            localField: 'serviceProvider',
                            foreignField: '_id',
                            as: 'SP'
                        }
                },
                {
                    $unwind:
                        {
                            path: "$SP"
                        }
                },
                {
                    $group:
                        {
                            _id: "$SP.username",
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
    },
    getCountReviews:async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot query this");
        }
        try{
            return models.CustomerReview.aggregate([
                {
                    $match:
                        {
                            to:mongoose.Types.ObjectId(sp_id)
                        }
                },
                {
                    $lookup:
                        {
                            from: 'serviceproviders',
                            localField: 'to',
                            foreignField: '_id',
                            as: 'SP'
                        }
                },
                {
                    $unwind:
                        {
                            path: "$SP"
                        }
                },
                {
                    $group:
                        {
                            _id: "$SP.username",
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
    },
    getCountWorkerNotification:async (parent,{worker},{models,user})=>{
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
            throw new Error("Action failed");
        }
    }
}

