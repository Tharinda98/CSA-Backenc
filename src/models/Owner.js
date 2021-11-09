const mongoose=require('mongoose');
const OwnerSchema=new mongoose.Schema(
    {
        owner_name:{
            type:String,
            required:true
        },
        owner_NIC:{
            type:String,
            required:true,
            unique:true,
            minlength:10,
            maxlength:12
        },
        contact_no:{
            type:String,
            required:true,
            minlength:10,
            maxlength:12
        },
        profile:{
            type:String,
            required:true,
            default:"ownerLink"
        }
    }
);
const Owner=mongoose.model('Owner',OwnerSchema);
module.exports = Owner;