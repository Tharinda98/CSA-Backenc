const mongoose=require('mongoose');
const StationSchema=new mongoose.Schema(
    {
        address:{
            type:String,
            required:true,
        },
        district:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'District',
            required:true,
        },
        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Customer',
            required:true
        }
    }
);
const WorkStation=mongoose.model('WorkStation',StationSchema);
module.exports =WorkStation;