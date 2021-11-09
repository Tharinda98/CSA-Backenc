module.exports={
    Customer_me:async (parent,args,{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You cannot query this");
        }
        return customer;
    }
}
