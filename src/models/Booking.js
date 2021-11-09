const mongoose=require('mongoose');
const BookingSchema=new mongoose.Schema(
    {
        by:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceProvider',
            required: true
        },
        state:{
            type: String,
            enum: ['open', 'confirmed', 'cancelled', 'expired'],
            default: 'open',
            lowercase: true
        },
        workStationAddress:{
            type:String,
            required:true,
            default:""
        },
        workStationDistrict:{
            type:String,
            required:true,
            lowercase:true
        },
        workStation:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WorkStation',
            default:null
        },
        description:{
            type: String
        },
        date:{
            type:Date,
            required:true,
            default:Date.now
        }

    });
const Booking=mongoose.model('Booking',BookingSchema);
module.exports = Booking;
