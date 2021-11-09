const {AuthenticationError}=require('apollo-server-express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports={
    signINModerator: async (parent,{username,password},{models})=>{
        const moderator=await models.Moderator.findOne({
            username:username
        });
        //console.log(moderator.left_date);
        if(!moderator){
            throw new AuthenticationError('Error Sign In in');
        }else if (moderator.left_date!=null){
            throw new Error("You left the company");
        }
        const valid=await bcrypt.compare(password,moderator.password);
        if (!valid){
            throw new AuthenticationError("Error Signin in ");
        }
        return jwt.sign({id:moderator._id},process.env.JWT_SECRET);
    },
    signINModSP:async (parent,{username,password},{models})=>{
        const moderator=await models.Moderator.findOne({
            username:username
        });
        const provider=await models.ServiceProvider.findOne({
            username:username
        });
        if(!moderator && !provider){
            throw new AuthenticationError('Error Sign In in');
        }
        if (moderator){
            if (moderator.left_date!=null){
                throw new Error("You left the company");
            }
        }
        if (provider){
            const valid=await bcrypt.compare(password,provider.password);
            if (!valid){
                throw new AuthenticationError("Error Signin in ");
            }
            return jwt.sign({id:provider._id},process.env.JWT_SECRET);
        }else if (moderator){
            const valid=await bcrypt.compare(password,moderator.password);
            if (!valid){
                throw new AuthenticationError("Error Signin in ");
            }
            return jwt.sign({id:moderator._id},process.env.JWT_SECRET);
        }


    }

}
