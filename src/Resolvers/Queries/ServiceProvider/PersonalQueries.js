const mongoose=require('mongoose');
module.exports = {
    SP_me: async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        if (!provider){
            throw new Error("You cannot query this");
        }
        return provider;
    },
    getMyReviews: async (parent, {offset,page},{models,user})=>{
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
            if (page===1){
                return models.CustomerReview.aggregate([
                    {
                        $match:
                            {
                                to:mongoose.Types.ObjectId(sp_id)
                            }
                    },
                    {
                        $sort:
                            {
                                createdAt:-1
                            }
                    },
                    {
                        $limit:offset
                    }
                ]);
            }else if (page>1) {
                return models.CustomerReview.aggregate([
                    {
                        $match:
                            {
                                to:mongoose.Types.ObjectId(sp_id)
                            }
                    },
                    {
                        $sort:
                            {
                                createdAt:-1
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
            throw new Error("Request failed");
        }
    },
    getMySP:async (parent,args,{models,user})=>{
        const provider=await models.ServiceProvider.findById(mongoose.Types.ObjectId(user.id));
        const moderator=await models.Moderator.findById(user.id);
        if (provider){
            return provider;
        }else if (moderator){
            return models.ServiceProvider.findById(moderator.serviceProvider);
        }else{
            throw new Error("YOu cannot do this");
        }
    },
    getCustomerReview:async (parent,{username},{models,user})=>{
        const rename=new RegExp(username,"i");
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
                }
            ]);
        }catch (err){
            console.log(err);
            throw new Error("Request failed")
        }

    }
}
