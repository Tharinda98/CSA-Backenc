const mongoose=require('mongoose');
const AppointmentSchema=new mongoose.Schema(
    {
        booking:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Booking',
            required:true,
            unique:true
        },
        appointment_id:{
            type:String,
            required:true,
            unique:true
        },
        starting_date:{
            type:Date,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        worker:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Worker'
            }
        ],
        state:{
            type:String,
            enum:['going','finished','open'],
            default:'open'
        },
        paid:{
            type:Boolean,
            required:true,
            default:false
        },
        finish_date:{
            type:Date,
            default:null
        },
        cost:{
            type:Number,
            default:0
        }

    }
);
const Appointment=mongoose.model('Appointment',AppointmentSchema);
module.exports = Appointment;
