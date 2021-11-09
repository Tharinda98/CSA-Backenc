module.exports = {
    serviceProvider: async (Worker,args,{models})=>{
        return models.ServiceProvider.findById(Worker.serviceProvider);
    }
}