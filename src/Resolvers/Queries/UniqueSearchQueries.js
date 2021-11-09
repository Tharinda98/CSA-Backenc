const mongoose=require('mongoose');
module.exports={
    UniqueSearchAppointment:async (parent,{appointment},{models})=>{
        try{
            return models.Appointment.findById(appointment);
        }catch (err){
            console.log(err);
            throw new Error("Resource not found");
        }

    },
    UniqueSearchModerator:async (parent,{moderator},{models})=>{
        try{
            return models.Moderator.findById(moderator);
        }catch (err){
            console.log(err);
            throw new Error("Resource not found");
        }

    },
    UniqueSearchWorker:async (parent,{worker},{models})=>{
        try{
            return models.Worker.findById(worker);
        }catch (err){
            console.log(err);
            throw new Error("Resource not found");
        }
    },
    UniqueSearchSP:async (parent,{provider},{models})=>{
        try{
            return models.ServiceProvider.findById(provider);
        }catch (err){
            console.log(err);
            throw new Error("Resource not found");
        }
    },
    UniqueGetCustomerReview: async (parent,{username},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("You cannot view reviews");
        }
        try{
            return models.CustomerReview.aggregate([
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
                                        "Customer.username":username
                                    },
                                    {
                                        to:mongoose.Types.ObjectId(sp_id)
                                    }
                                ]
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Request failed")
        }
    },
    UniqueSearchBooking:async (parent,{username},{models,user})=>{
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
                                            "Customer.username":username
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
    }
}
