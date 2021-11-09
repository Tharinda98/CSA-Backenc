module.exports={
    moderator_me:async (parent,args,{models,user})=>{
        const moderator=await models.Moderator.findById(user.id);
        if (!moderator){
            throw new Error("You cannot query this");
        }
        return moderator;
    }
}
