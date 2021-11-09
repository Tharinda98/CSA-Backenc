module.exports = {
    checkDistrictOnServiceProvider: async (parent,{districtName},{models})=>{
        return models.ServiceProvider.aggregate(
            [
                {
                    $unwind:{
                        path: "$workingRange"
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                workingRange: districtName
                            },
                            {
                                state:"approved"
                            }
                        ]
                    }
                }
            ]
        );
    },
    defaultSorting: async (parent,{args},{models})=>{
        return models.ServiceProvider.aggregate(
            [
                {
                    $lookup:{
                        from: 'memberships',
                        localField: 'membership',
                        foreignField: '_id',
                        as: 'member'
                    }
                },
                {
                    $unwind:{
                        path: "$member"
                    }
                },
                {
                    $sort:{
                        "member.membership_value": -1
                    }
                }
            ]
        );
    },
    sortingByRating: async (parent,{args},{models})=>{
        return models.ServiceProvider.aggregate(
            [
                {
                    $sort:{
                        rating: -1
                    }
                }
            ]
        );
    },
    getServiceProviderByDistrictService:async (parent,{district,service},{models,user})=>{
        const redis=new RegExp(district,"i");
        const reser=new RegExp(service,"i");
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot query this");
        }
        try{
            return models.ServiceProvider.aggregate([
                {
                    $unwind:
                        {
                            path: "$service"
                        }
                },
                {
                    $unwind:
                        {
                            path: "$workingRange"
                        }
                },
                {
                    $match:
                        {
                            $and:
                            [
                                {
                                    service:
                                        {
                                            $regex:reser
                                        }
                                },
                                {
                                    workingRange:
                                        {
                                            $regex:redis
                                        }
                                },
                                {
                                    state:"approved"
                                }
                            ]
                        }
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Error occurred while search");
        }
    }
}
