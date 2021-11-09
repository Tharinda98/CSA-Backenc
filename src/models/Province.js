const mongoose=require('mongoose');
const provinceSchema=new mongoose.Schema({
    provinceName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        enum:['north','south','central','east','north-central','north-west','sabaragamuwa','uva','west']
    }
});
const Province=mongoose.model('Province',provinceSchema);
module.exports=Province;