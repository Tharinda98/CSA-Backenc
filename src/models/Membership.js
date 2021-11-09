const mongoose=require('mongoose');
const MembershipSchema=new mongoose.Schema(
    {
        membership_name:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            default:"silver",
            enum:['platinum','gold','silver']
        },
        membership_period:{
            type:Number,
            required:true,
            unique:true,
            default:1,
            enum:[3,2,1]
        },
        membership_value:{
            type:Number,
            required:true,
            unique:true,
            enum:[100,50,25]

        },
        description:{
            type:String,
            default:"none"
        }
    }
);
const Membership=mongoose.model('Membership',MembershipSchema);
module.exports=Membership;