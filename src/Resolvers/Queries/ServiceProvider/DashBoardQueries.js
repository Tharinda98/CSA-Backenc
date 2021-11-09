const mongoose=require('mongoose');
module.exports={
    bookingFeed:async (parent,args,{models,user})=>{
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
            return models.Booking.aggregate([
                {
                    $project:
                        {
                            Date:{
                                $dateToString:{
                                    format: "%Y-%m-%d",
                                    date: "$date"
                                }
                            },
                            by:"$by",
                            to:"$to"
                        }
                },
                {
                    $match:
                        {
                            to:mongoose.Types.ObjectId(sp_id)
                        }
                },
                {
                    $group:
                        {
                            _id: "$Date",
                            Count: {
                                $sum: 1
                            }
                        }
                },
                {
                    $sort:
                        {
                            _id: -1
                        }
                },
                {
                    $limit:5
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error in fetching values");
        }
    },

    workStats: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot do this query");
        }
        try{
            return models.Booking.aggregate([
                {
                    $lookup:
                        {
                            from: 'appointments',
                            localField: '_id',
                            foreignField: 'booking',
                            as: 'confirmed'
                        }
                },
                {
                    $match:
                        {
                            to:mongoose.Types.ObjectId(sp_id)
                        }
                },
                {
                    $project:
                        {
                            state:"$state",
                            confirmed:"$confirmed"
                        }
                },
                {
                    $unwind:
                        {
                            path: "$confirmed",
                            preserveNullAndEmptyArrays: true
                        }
                },
                {
                    $project:
                        {
                            state:"$state",
                            confirmed:"$confirmed.state"
                        }
                },
                {
                    $project:
                        {
                            confirmed:{$ifNull:["$confirmed","$state"]}
                        }
                },
                {
                    $group:
                        {
                            _id: "$confirmed",
                            Count: {
                                $sum: 1
                            }
                        }
                },
                {
                    $sort:{
                        _id:-1
                    }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error in fetching info");
        }
    },

    ratingStats: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot do this query");
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
                    $group:
                        {
                            _id: "$rating",
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
            throw new Error("Cannot fetch now");
        }
    },
    finishedWorkStats:async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot do this query");
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
                            path:"$Booking"
                        }
                },
                {
                    $match:
                        {
                            $and:
                                [
                                    {
                                        state:"finished"
                                    },
                                    {
                                        "Booking.to":mongoose.Types.ObjectId(sp_id)
                                    }
                                ]
                        }
                },
                {
                    $project:
                        {
                            finish_date:
                                {
                                    $dateToString:
                                        {
                                            format:"%Y-%m-%d",
                                            date:"$finish_date"
                                        }
                                },
                            state:"$state"
                        }
                },
                {
                    $group:
                        {
                            _id: "$finish_date",
                            Count: {
                                $sum: 1
                            }
                        }
                },
                {
                    $sort:
                        {
                            _id: -1
                        }
                },
                {
                    $limit:5
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching")
        }
    }

}
