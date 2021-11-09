const mongoose=require('mongoose');
const ServiceSchema=new mongoose.Schema(
    {
        service_name:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
        },
        description:{
            type:String,
            default:"None"
        },
        icon:{
            type:String,
            required:true,
            default:"",
            unique:true
        }

    }
);
const Service=mongoose.model('Service',ServiceSchema);
module.exports=Service;