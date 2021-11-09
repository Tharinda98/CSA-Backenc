module.exports ={
    by: async (Booking,{args},{models})=>{
        return models.Customer.findById(Booking.by);
    },
    to: async (Booking,{args},{models})=>{
        return models.ServiceProvider.findById(Booking.to)
    }
}
