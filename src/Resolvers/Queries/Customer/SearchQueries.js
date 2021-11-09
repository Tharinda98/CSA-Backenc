module.exports={
    searchSPByUsername:async (parent,{username},{models,user})=>{
        const rename=new RegExp(username,"i");
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot query this");
        }
        try{
            return models.ServiceProvider.aggregate([
                {
                    $match:
                        {
                            $and:
                            [
                                {
                                    username:
                                        {
                                            $regex:rename
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
            throw new Error("Error occurred while searching");
        }
    }
}
