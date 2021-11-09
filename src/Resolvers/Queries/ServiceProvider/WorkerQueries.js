const {AuthenticationError} = require('apollo-server-express');
const mongoose=require('mongoose');
module.exports={
    showWorkers: async (parent,args,{models})=>{
        return models.Worker.aggregate([
            {
                $sort:{
                    name:1
                }
            }
        ])
    },
    getMyWorkers: async (parent,{offset,page},{models,user})=>{
        if (!user){
            throw new AuthenticationError("You are not logged in");
        }
        let sp_id=null;
        const foundSP=await models.ServiceProvider.findById(user.id);
        const foundMod=await models.Moderator.findById(user.id);
        if (foundSP){
            console.log("SP uses");
            sp_id=user.id;
        }else if (foundMod){
            sp_id=foundMod.serviceProvider;
        }else{
            throw new Error("You didn't have previllage");
        }
        console.log(sp_id);
        if (page===1){
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
                                    left_date:null
                                }
                            ]
                        }

                },
                {
                    $sort:{
                        name:1
                    }
                },
                {
                    $limit:offset
                }
            ]);
        }else if (page>1) {
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
                                        left_date:null
                                    }
                                ]
                        }

                },
                {
                    $sort:{
                        name:1
                    }
                },
                {
                    $skip:offset*(page-1)

                },
                {
                    $limit:offset
                }
            ]);
        }else{
            throw new Error("Page 1 is minimum");
        }
    },
    getMyModerators: async (parent,{offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        if (!provider){
            throw new Error("You aren't SP");
        }
        try{
            if (page===1){
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
                        $sort:
                            {
                                name:1
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
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
                        $sort:
                            {
                                name:1
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
            throw new Error("Error while fetching");
        }
    },
    SP_CheckWorkerUsernameAvailability: async (parent,{username},{models,user})=>{
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
            const worker=await models.Worker.findOne({username:username,serviceProvider:sp_id});
            if (worker){
                return worker;
            }
        }catch (err){
            console.log(err);
            throw new Error("Source not found");
        }
    }
}

