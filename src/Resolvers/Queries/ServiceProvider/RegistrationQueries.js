module.exports={
    getMembership:async (parent,{membership_name},{models})=>{
        return models.Membership.findOne({membership_name:membership_name});
    }
}