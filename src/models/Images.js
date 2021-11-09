const mongoose=require('mongoose');
const ImageSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
        },
        url:{
            type:String,
            required:true,
            unique:true
        },
        descripton:{
            type:String,
            default:"CSA Image"
        },
        date:{
            type:Date,
            required:true,
            default:Date.now
        }
    }
);
const Image=mongoose.model('Image',ImageSchema);
module.exports=Image;
