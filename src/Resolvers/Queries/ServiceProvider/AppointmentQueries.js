const mongoose=require('mongoose');
module.exports={
    getMyOngoingWorks: async (parent, {offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=user.id;
        }else{
            throw new Error("You didn't have privilage");
        }
        try{
            if (page===1){
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
                                $and:
                                    [
                                        {state:"going"},
                                        {"Booking.to":mongoose.Types.ObjectId(sp_id)}
                                    ]
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
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
                                $and:
                                    [
                                        {state:"going"},
                                        {"Booking.to":mongoose.Types.ObjectId(sp_id)}
                                    ]
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
            throw new Error("Error occured");
        }
    },

    getMyWorks:async (parent, {offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=user.id;
        }else{
            throw new Error("You didn't have privilage");
        }
        try{
            if (page===1){
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
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
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
                        $skip:offset*(page-1)

                    },
                    {
                        $limit:offset
                    }
                ]);
            }
        }catch (err){
            console.log(err);
            throw new Error("Error occured");
        }
    },
    getMyFinishedWorks:async (parent, {offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=user.id;
        }else{
            throw new Error("You didn't have privilage");
        }
        try{
            if (page===1){
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
                                $and:
                                    [
                                        {state:"finished"},
                                        {"Booking.to":mongoose.Types.ObjectId(sp_id)}
                                    ]
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
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
                                $and:
                                    [
                                        {state:"finished"},
                                        {"Booking.to":mongoose.Types.ObjectId(sp_id)}
                                    ]
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
            throw new Error("Error occured");
        }
    },

    getAppointment:async (parent,{appointment_id},{models,user})=>{
        const re=new RegExp(appointment_id,"i");
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=user.id;
        }else{
            throw new Error("You didn't have privilage");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $lookup:
                        {
                            from: 'bookings',
                            localField: 'booking',
                            foreignField: '_id',
                            as: 'Book'
                        }
                },
                {
                    $unwind:
                        {
                            path:"$Book"
                        }
                },
                {
                    $match:
                        {
                            "Book.to":mongoose.Types.ObjectId(sp_id)
                        }
                },
                {
                    $match:
                        {
                            appointment_id:{
                                $regex:re
                            }
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Search failed");
        }
    },
    getMyUnpaidWorks:async (parent, {offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=user.id;
        }else{
            throw new Error("You didn't have privilege");
        }
        try{
            if (page===1){
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
                                $and:
                                    [
                                        {state:"finished"},
                                        {"Booking.to":mongoose.Types.ObjectId(sp_id)},
                                        {paid:false}
                                    ]
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
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
                                $and:
                                    [
                                        {state:"finished"},
                                        {"Booking.to":mongoose.Types.ObjectId(sp_id)},
                                        {paid:false}
                                    ]
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
            throw new Error("Error occurred");
        }
    },
}
