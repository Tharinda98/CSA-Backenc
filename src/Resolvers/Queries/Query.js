module.exports = {
    showProvinces: async (parent,args,{models})=>{
        return await models.Province.find();
    },
    showDistricts:async (parent,args,{models})=>{
        return models.District.aggregate([
            {
                $sort:
                    {
                        districtName:1
                    }
            }
        ]);
    },
    showDistricts_pagination: async (parent, {offset,page},{models})=>{
        //return models.District.find().skip(offset * page).limit(offset);
        if (page===1){
            return models.District.aggregate([
                {
                    $sort:
                        {
                            districtName: 1
                        }
                },
                {
                    $limit:offset
                }
            ])
        }else{
            return models.District.aggregate([
                {
                    $sort:
                        {
                            districtName:1
                        }
                },
                {
                    $skip:offset*(page-1)

                },
                {
                    $limit:offset
                }
            ])
        };
    },

    showOwners: async (parent,args,{models})=>{
        return await models.Owner.find();
    },

    showServiceProviders: async (parent,args,{models})=>{
        return await models.ServiceProvider.find();
    },

    districtsByProvince: async (parent,{ProvinceName},{models})=> {
        const proname=ProvinceName.toLowerCase();
        return models.District.aggregate([
            {
                $lookup:
                    {
                        from: 'provinces',
                        localField: 'province',
                        foreignField: '_id',
                        as: 'Province'
                    }
            },
            {
                $unwind:
                    {
                        path:"$Province"
                    }
            },
            {
                $match:
                    {
                        "Province.provinceName":proname
                    }
            }
        ]);
    },

    CheckUsername:async (parent,{username},{models})=>{
        const provider=await models.ServiceProvider.findOne({username:username});
        const moderator=await models.Moderator.findOne({username:username});
        const worker=await models.Worker.findOne({username:username});
        const customer=await models.Customer.findOne({username:username});
        if (provider==null && moderator==null && worker==null && customer==null){
            return true;
        }else{
            return false;
        }
    },
    CheckAppointmentID:async (parent,{appointment_id},{models})=>{
        const appointment=await models.Appointment.findOne({appointment_id:appointment_id});
        if (appointment){
            return false;
        }else{
            return true;
        }
    },

    getMemberships: async (parent,args,{models})=>{
        return models.Membership.aggregate([
            {
                $sort:
                    {
                        membership_value: -1
                    }
            }
        ]);
    }

};
