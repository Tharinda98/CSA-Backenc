const mongoose=require('mongoose');
const ReviewSchema=new mongoose.Schema(
    {
        by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Customer',
            required:true
        },
        to:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ServiceProvider',
            required:true
        },
        content:{
            type:String,
            required:true,
            default:"no comments"
        },
        rating:{
            type:Number,
            default:0,
            min:0,
            max:5
        },
        publish:{
            type:Boolean,
            required:true,
            default:true
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now
        }
    }
);
const CustomerReview=mongoose.model('CustomerReview',ReviewSchema);
module.exports = CustomerReview;
