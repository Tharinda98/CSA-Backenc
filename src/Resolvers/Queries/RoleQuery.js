const mongoose=require('mongoose');
module.exports= {
    getMyRole: async (parent, args, {models, user}) => {
        const provider = await models.ServiceProvider.findById(user.id);
        const moderator = await models.Moderator.findById(user.id);
        const customer = await models.Customer.findById(user.id);
        const worker = await models.Worker.findById(user.id);
        if (provider){
            return "ServiceProvider";
        }else if (moderator){
            return "Moderator";
        }else if (customer){
            return "Customer";
        }else if (worker){
            return "Worker";
        }else{
            throw new Error("Log-in failed");
        }
    },
    getMe:async (parent,args,{models,user})=>{
        const provider = await models.ServiceProvider.findById(user.id);
        const moderator = await models.Moderator.findById(user.id);
        const customer = await models.Customer.findById(user.id);
        const worker = await models.Worker.findById(user.id);
        if (provider){
            return models.ServiceProvider.aggregate([
                {
                    $project:
                        {
                            _id:"$_id",
                            username:"$username",
                            role:"serviceProvider"
                        }
                },
                {
                    $match:
                        {
                            _id:mongoose.Types.ObjectId(user.id)
                        }
                }
            ]);
        }else if (moderator){
            return models.Moderator.aggregate([
                {
                    $project:
                        {
                            _id:"$_id",
                            username:"$username",
                            role:"moderator"
                        }
                },
                {
                    $match:
                        {
                            _id:mongoose.Types.ObjectId(user.id)
                        }
                }
            ]);
        }else if (customer){
            return models.Customer.aggregate([
                {
                    $project:
                        {
                            _id:"$_id",
                            username:"$username",
                            role:"customer"
                        }
                },
                {
                    $match:
                        {
                            _id:mongoose.Types.ObjectId(user.id)
                        }
                }
            ]);
        }else if (worker){
            return models.Worker.aggregate([
                {
                    $project:
                        {
                            _id:"$_id",
                            username:"$username",
                            role:"worker"
                        }
                },
                {
                    $match:
                        {
                            _id:mongoose.Types.ObjectId(user.id)
                        }
                }
            ]);
        }else{
            throw new Error("Log-in failed");
        }
    }
}
