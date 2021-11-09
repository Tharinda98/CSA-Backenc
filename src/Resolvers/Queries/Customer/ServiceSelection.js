module.exports={
    getServiceProvidersByService: async (parent,{service},{models})=>{
        return models.ServiceProvider.aggregate(
            [
                {
                    $unwind:{
                        path: "$service"
                    }
                },
                {
                    $match:{
                        $and:[
                            {
                                service:service
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
    getServices: async (parent,{args},{models})=>{
        return models.Service.aggregate(
            [
                {
                    $sort:{
                        service_name: 1
                    }
                }
            ]
        );
    }
}
