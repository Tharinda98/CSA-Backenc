module.exports={
    getMyMessages: async (parent,{offset,page},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        const customer=await models.Customer.findById(user.id);
        let user_name=null;
        if (provider){
            user_name=provider.username;
        }else if (moderator){
            const sp=await models.ServiceProvider.findById(moderator.serviceProvider);
            user_name=sp.username;
        }else if (worker){
            user_name=worker.username;
        }else if (customer){
            user_name=customer.username;
        }else{
            throw new Error("You have to signin");
        }
        try{
            if (page===1){
                return models.Message.aggregate([
                    {
                        $match:
                            {
                                to: user_name
                            }
                    },
                    {
                        $sort:{
                            received_date:-1
                        }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
                return models.Message.aggregate([
                    {
                        $match:
                            {
                                to: user_name
                            }
                    },
                    {
                        $sort:{
                            received_date:-1
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
            throw new Error("cannot retrive messages");
        }

    }
}
