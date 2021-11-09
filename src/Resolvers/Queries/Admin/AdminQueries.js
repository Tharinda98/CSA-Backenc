module.exports = {
    showCustomers:async (parent,{args},{models})=>{
        return models.Customer.aggregate([
            {
                $sort:
                    {
                        username:1
                    }
            }
        ]);
    },
    showSPS:async (parent,args,{models})=>{
        return models.ServiceProvider.aggregate([
            {
                $sort:
                    {
                        username:1
                    }
            }
        ])
    },
    showModerators: async (parent,args,{models})=>{
        return models.Moderator.aggregate([
            {
                $sort:
                    {
                        username:1
                    }
            }
        ])
    },
    admin_getOpenSP:async (parent,args,{models,user})=>{
        const admin=await models.SystemAdmin.findById(user.id);
        if (!admin){
            throw new Error("You cannot do this");
        }
        try{
            return models.ServiceProvider.aggregate([
                {
                    $match:
                        {
                            state:"registered"
                        }
                },
                {
                    $sort:
                        {
                            joined_at: 1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    },

    admin_getDateWiseTotalPayment: async (parent,args,{models,user})=>{
        const admin=await models.SystemAdmin.findById(user.id);
        if (!admin){
            throw new Error("You cannot do this");
        }
        try{
            return models.Payment.aggregate([
                {
                    $lookup:
                        {
                            from: 'appointments',
                            localField: 'appointment',
                            foreignField: '_id',
                            as: 'Work'
                        }
                },
                {
                    $unwind:
                        {
                            path:"$Work"
                        }
                },
                {
                    $project:
                        {
                            paid_date:
                                {
                                    $dateToString:
                                        {
                                            format:"%Y-%m-%d",
                                            date:"$payedOn"
                                        }
                                },
                            amount:"$amount"
                        }
                },
                {
                    $group:
                        {
                            _id: "$paid_date",
                            Amount: {
                                $sum: "$amount"
                            }
                        }
                },
                {
                    $sort:
                        {
                            _id: -1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    },

    admin_getSpecificDateTotalPayment: async (parent,{date},{models,user})=>{
        const admin=await models.SystemAdmin.findById(user.id);
        if (!admin){
            throw new Error("You cannot do this");
        }
        try{
            return models.Payment.aggregate([
                {
                    $lookup:
                        {
                            from: 'appointments',
                            localField: 'appointment',
                            foreignField: '_id',
                            as: 'Work'
                        }
                },
                {
                    $unwind:
                        {
                            path:"$Work"
                        }
                },
                {
                    $project:
                        {
                            paid_date:
                                {
                                    $dateToString:
                                        {
                                            format:"%Y-%m-%d",
                                            date:"$payedOn"
                                        }
                                },
                            amount:"$amount"
                        }
                },
                {
                    $group:
                        {
                            _id: "$paid_date",
                            Amount: {
                                $sum: "$amount"
                            }
                        }
                },
                {
                    $match:
                        {
                            _id:date
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    },
    admin_getDateWiseTotalPayableAmount: async (parent,args,{models,user})=>{
        const admin=await models.SystemAdmin.findById(user.id);
        if (!admin){
            throw new Error("You cannot do this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $match:
                        {
                            state:"finished"
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
                            Amount:"$cost"
                        }
                },
                {
                    $group:
                        {
                            _id: "$finish_date",
                            Amount: {
                                $sum: "$Amount"
                            }
                        }
                },
                {
                    $sort:
                        {
                            _id: -1
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    },
    admin_getSpecificDateWiseTotalPayableAmount: async (parent,{date},{models,user})=>{
        const admin=await models.SystemAdmin.findById(user.id);
        if (!admin){
            throw new Error("You cannot do this");
        }
        try{
            return models.Appointment.aggregate([
                {
                    $match:
                        {
                            state:"finished"
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
                            Amount:"$cost"
                        }
                },
                {
                    $group:
                        {
                            _id: "$finish_date",
                            Amount: {
                                $sum: "$Amount"
                            }
                        }
                },
                {
                    $match:
                        {
                            _id: date
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error while fetching data");
        }
    }
}
