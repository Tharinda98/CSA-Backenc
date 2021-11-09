module.exports = {
    serviceProvider:async (NotificationSP,args,{models})=>{
        return models.ServiceProvider.findById(NotificationSP.serviceProvider);
    }
}
