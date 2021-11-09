module.exports = {
    customer:async (NotificationCustomer,args,{models})=>{
        try{
            return models.Customer.findById(NotificationCustomer.customer);
        }catch (err){
            console.log(err);
            throw new Error("Cannot find Customer id");
        }
    }
}
