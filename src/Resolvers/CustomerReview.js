module.exports={
    by: async (CustomerReview,args,{models})=>{
        return models.Customer.findById(CustomerReview.by);
    },
    to: async (CustomerReview,args,{models})=>{
        return models.ServiceProvider.findById(CustomerReview.to);
    }


}
