const mongoose=require('mongoose');
const RecordSchema=new mongoose.Schema(
    {
        appointment_id:{
            type:String,
            required:true,
            unique:true
        },
        images:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Image'
            }
        ]
    }
);
const Record=mongoose.model('Record',RecordSchema);
module.exports = Record;
