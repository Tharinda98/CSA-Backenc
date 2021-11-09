const mongoose=require('mongoose');
const NotificationSPSchema=new mongoose.Schema(
    {
        serviceProvider:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ServiceProvider',
            required:true
        },
        message:{
            type:String,
            required:true,
            default:"you received some notifications"
        },
        date:{
            type:Date,
            required:true,
            default:Date.now
        },
        state:{
            type:String,
            enum:{
                values:['open','closed'],
                message:'Your state is not supported'
            },
            default:'open'
        }
    }
);
const NotificationSP=mongoose.model('NotificationSP',NotificationSPSchema);
module.exports = NotificationSP;
