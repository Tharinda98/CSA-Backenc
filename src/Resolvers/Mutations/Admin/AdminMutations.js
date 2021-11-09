const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {AuthenticationError}=require('apollo-server-express');
require('dotenv').config();
module.exports= {
    signUPAdmin: async (parent, {username, password}, {models}) => {
        const hashed = await bcrypt.hash(password, 10);
        try {
            return await models.SystemAdmin.create({
                username:username,
                password: hashed
            });
        } catch (err) {
            console.log(err);
            throw new Error('Error Creating Account')
        }
    },
    signINAdmin: async (parent,{username,password},{models})=>{
        const admin=await models.SystemAdmin.findOne({
            username:username
        });
        if(!admin){
            throw new AuthenticationError('Error Signin in');
        }
        const valid=await bcrypt.compare(password,admin.password);
        if (!valid){
            throw new AuthenticationError("Error Signin in ");
        }
        return jwt.sign({id:admin._id},process.env.JWT_SECRET);
    }
}