const mongoose=require('mongoose');
const CustomerSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profile: {
            type: String
        },
        name:{
            type:String,
            required:true
        },
        contact_no:{
            type:String,
            required:true,
            unique:true
        },
        email: {
            type:String
        },
        joined:{
            type:Date,
            required:true,
            default:Date.now
        },
        no_of_vote:{
            type:Number,
            required:true,
            default:0
        },
        rating:{
            type:Number,
            default:0,
            required:true

        }
    }
);
const Customer=mongoose.model('Customer',CustomerSchema);
module.exports = Customer;