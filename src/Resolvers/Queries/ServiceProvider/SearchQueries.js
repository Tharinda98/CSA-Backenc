const mongoose=require('mongoose');
module.exports={
    getModerator:async (parent,{username},{models,user})=>{
        const rename=new RegExp(username,"i");
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
                                    username:
                                        {
                                            $regex:rename
                                        }
                                },
                                {
                                    left_date:null
                                }
                            ]
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Search Failed");
        }
    },
    getWorker: async (parent,{username},{models,user})=>{
        const rename=new RegExp(username,"i");
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
            return models.Worker.aggregate([
                {
                    $match:
                        {
                            $and:
                                [
                                    {
                                        serviceProvider:mongoose.Types.ObjectId(sp_id)
                                    },
                                    {
                                        username:
                                            {
                                                $regex:rename
                                            }
                                    },
                                    {
                                        left_date:null
                                    }
                                ]
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Search Failed");
        }
    },
    searchBooking:async (parent,{username},{models,user})=>{
        const rename=new RegExp(username,"i");
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
                    $lookup:
                        {
                            from: 'customers',
                            localField: 'by',
                            foreignField: '_id',
                            as: 'Customer'
                        }
                },
                {
                    $unwind:
                        {
                            path: "$Customer"
                        }
                },
                {
                    $match:
                        {
                            $and:
                            [
                                {
                                    "Customer.username":
                                        {
                                            $regex:rename
                                        }
                                },
                                {
                                    to:mongoose.Types.ObjectId(sp_id)
                                }
                            ]
                        }
                },
                {
                    $sort:
                        {
                            date:-1
                        }
                }
                ]
            );
        }catch (err){
            console.log(err);
            throw new Error("Search Failed");
        }
    },
    searchFinishAppointment: async (parent,{id},{models,user})=>{
        const reid=new RegExp(id,"i");
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
                                    "Booking.to":mongoose.Types.ObjectId(sp_id)
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
            throw new Error("Search Failed");
        }
    },
    searchOpenAppointment: async (parent,{id},{models,user})=>{
        const reid=new RegExp(id,"i");
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
                                        "Booking.to":mongoose.Types.ObjectId(sp_id)
                                    },
                                    {
                                        state:"open"
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
            throw new Error("Search Failed");
        }
    }
}
