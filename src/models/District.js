const mongoose=require('mongoose');
const districtSchema=new mongoose.Schema({
    province:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Province',
        required:true
    },
    districtName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    }
});
const District=mongoose.model('District',districtSchema);
module.exports = District;