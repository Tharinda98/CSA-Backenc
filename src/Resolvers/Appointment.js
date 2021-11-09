module.exports={
    booking: async (Appointment,args,{models})=>{
        return models.Booking.findById(Appointment.booking);
    },
    worker:async (Appointment,args,{models})=>{
        return models.Worker.find({_id:{$in:Appointment.worker}});
    }
}
