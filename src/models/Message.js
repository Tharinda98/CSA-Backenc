const mongoose=require('mongoose');
const MessageSchema=new mongoose.Schema(
    {
        by:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true,
            default:""
        },
        read:{
            type:Boolean,
            default:false,
            required:true
        },
        received_date:{
            type:Date,
            required:true,
            default:Date.now
        }
    }
);
const Message=mongoose.model('Message',MessageSchema);
module.exports = Message;
