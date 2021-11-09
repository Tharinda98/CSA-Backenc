const {AuthenticationError} = require('apollo-server-express');
const bcrypt = require('bcrypt');
//const mongoose=require('mongoose');

module.exports={
    addModerator: async (parent,{username,password,name,nic,email,contact_no,address},{models,user})=>{
        console.log(user.id);
        const foundSP=await models.ServiceProvider.findById(user.id);
        if (!user){
            throw new AuthenticationError("You are not logged in");
        }
        if(!foundSP){
            throw new AuthenticationError("You might be using a fake token");
        }
        const hashed=await bcrypt.hash(password,10);
        try{
            return models.Moderator.create({
                serviceProvider:user.id,
                username:username,
                password:hashed,
                name:name,
                nic:nic,
                email:email,
                contact_no:contact_no,
                address:address
            });
        }catch (err){
            throw new Error("Addition of Moderator Failed");
        }

    },

    addWorker:async (parent,{username,password,name,nic,email,contact_no,address},{models,user})=>{
        const foundSP=await models.ServiceProvider.findById(user.id);
        const foundMod=await models.Moderator.findById(user.id);
        const hashed=await bcrypt.hash(password,10);
        if (!user){
            throw new AuthenticationError("You are not logged in");
        }
        if(foundSP){
            console.log("SP works");
            try{
                return models.Worker.create({
                    serviceProvider:user.id,
                    username:username,
                    password:hashed,
                    name:name,
                    nic:nic,
                    email:email,
                    contact_no:contact_no,
                    address:address
                });
            }catch (err){
                console.log(err);
                throw new Error("Addition of Worker is failed");
            }
        }else if (foundMod){
            console.log("Moderator Works");
            try{
                return models.Worker.create({
                    serviceProvider:foundMod.serviceProvider,
                    username:username,
                    password:hashed,
                    name:name,
                    nic:nic,
                    email:email,
                    contact_no:contact_no,
                    address:address
                });
            }catch (err){
                console.log(err);
                throw new Error("Addition of Worker is failed");
            }
        }else{
            throw new Error("You didn't have previlage");
        }
    },
    removeWorker:async (parent,{worker},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        if (!provider){
            throw new Error("You cannot do this");
        }
        try{
            models.Worker.updateOne({_id:worker},{$set:{left_date:Date.now()}},function(err,docs){
                if (err){
                    console.log(err);
                }else{
                    console.log(docs);
                }
            });
            return true;
        }catch (err){
            console.log(err);
            return false;
        }
    },
    removeModerator:async (parent,{moderator},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        if (!provider){
            throw new Error("You cannot do this");
        }
        try{
            models.Moderator.updateOne({_id:moderator},{$set:{left_date:Date.now()}},function(err,docs){
                if (err){
                    console.log(err);
                }else{
                    console.log(docs);
                }
            });
            return true;
        }catch (err){
            console.log(err);
            return false;
        }
    }
}
