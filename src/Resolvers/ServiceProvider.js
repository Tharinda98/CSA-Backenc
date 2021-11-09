module.exports = {
    owner: async (ServiceProvider,args,{models})=>{
        return models.Owner.findById(ServiceProvider.owner);
    },
    membership: async (ServiceProvider,args,{models})=>{
        return models.Membership.findById(ServiceProvider.membership);
    }
}
