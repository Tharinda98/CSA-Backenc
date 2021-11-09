module.exports = {
    serviceProvider: async (Moderator,args,{models})=>{
        return models.ServiceProvider.findById(Moderator.serviceProvider);
    }
}

