const mongoose=require('mongoose');
const AccountSchema=new mongoose.Schema(
    {
        card_holder:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Customer',
            required:true
        },
        acc_no:{
            type:String,
            required:true,
            unique:true
        },
        valid_date:{
            type:String,
            required:true
        },
        name_on_card:{
            type:String,
            required:true
        }
    }
);
const CustomerAccount=mongoose.model('Account',AccountSchema);
module.exports = CustomerAccount;
