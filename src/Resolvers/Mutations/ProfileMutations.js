//const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
module.exports={
    setPassword:async (parent,{password},{models,user})=>{
        const hashed=await bcrypt.hash(password,10);
        const provider = await models.ServiceProvider.findById(user.id);
        const moderator = await models.Moderator.findById(user.id);
        const customer = await models.Customer.findById(user.id);
        const worker = await models.Worker.findById(user.id);
        if (provider){
            try{
                models.ServiceProvider.updateOne({_id:user.id},{$set:{password:hashed}},function(err,docs){
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
        }else if (moderator){
            try{
                models.Moderator.updateOne({_id:user.id},{$set:{password:hashed}},function(err,docs){
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
        }else if (customer){
            try{
                models.Customer.updateOne({_id:user.id},{$set:{password:hashed}},function(err,docs){
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
        }else if (worker){
            try{
                models.Worker.updateOne({_id:user.id},{$set:{password:hashed}},function(err,docs){
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
        }else{
            throw new Error("Log-in failed");
        }
    },

    setProfilePic:async (parent,{picture},{models,user})=>{
        const provider = await models.ServiceProvider.findById(user.id);
        const moderator = await models.Moderator.findById(user.id);
        const customer = await models.Customer.findById(user.id);
        const worker = await models.Worker.findById(user.id);
        if (provider){
            try{
                models.ServiceProvider.updateOne({_id:user.id},{$set:{profile:picture}},function(err,docs){
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
        }else if (moderator){
            try{
                models.Moderator.updateOne({_id:user.id},{$set:{profile:picture}},function(err,docs){
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
        }else if (customer){
            try{
                models.Customer.updateOne({_id:user.id},{$set:{profile:picture}},function(err,docs){
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
        }else if (worker){
            try{
                models.Worker.updateOne({_id:user.id},{$set:{profile:picture}},function(err,docs){
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
        }else{
            throw new Error("Profile upload failed");
        }
    }
}
