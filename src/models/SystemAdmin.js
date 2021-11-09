const mongoose=require('mongoose');
const AdminSchema= new mongoose.Schema(
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
        profile:{
            type:String,
            required:true,
            default:"none"
        }
    }
);

const SystemAdmin=mongoose.model('SystemAdmin',AdminSchema);
module.exports=SystemAdmin;