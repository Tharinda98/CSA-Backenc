const mongoose=require('mongoose');
const NotificationCustomerSchema=new mongoose.Schema(
    {
        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Customer',
            required:true
        },
        message:{
            type:String,
            required:true,
            default:"You received a notification"
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
const NotificationCustomer=mongoose.model('NotificationCustomer',NotificationCustomerSchema);
module.exports = NotificationCustomer;
