module.exports = {
    approveServiceProvider: async (parents,{username},{models,user})=>{
        const admin=await models.SystemAdmin.findById(user.id);
        if (!admin){
            throw new Error("You didn't have previlage");
        }
        try{
            models.ServiceProvider.updateOne({username:username},{state:"approved"},function (err,docs){
                if (err){
                    console.log(err);
                }
                else{
                    console.log(docs);
                }
            });
            return true;
        }catch (err){
            console.log(err);
            throw new Error("Approval failed");
        }
    }
}
