module.exports = {
    pushService:async (parent,{service},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("you cannot do this");
        }
        try{
            models.ServiceProvider.updateOne({_id:sp_id},{$push:{service:service}},function(err,docs){
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
    pushDistrict:async (parent,{district},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("you cannot do this");
        }
        try{
            models.ServiceProvider.updateOne({_id:sp_id},{$push:{workingRange:district}},function(err,docs){
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
    editInfo:async (parent,{email,contact_no,address},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        const worker=await models.Worker.findById(user.id);
        console.log(email==null);
        if (provider){
            if (email==null){
                email=provider.email;
            }
            if (contact_no==null){
                contact_no=provider.contact_no;
            }
            if (address==null){
                address=provider.address;
            }
            try{
                models.ServiceProvider.updateOne({_id:user.id},{$set:{email:email,contact_no:contact_no,address:address}},function(err,docs){
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
            console.log("moderator");
            if (email==null){
                email=moderator.email;
            }
            if (contact_no==null){
                contact_no=moderator.contact_no;
            }
            if (address==null){
                address=moderator.address;
            }
            try{
                console.log(email,contact_no,address);
                models.Moderator.updateOne({_id:user.id},{$set:{email:email,contact_no:contact_no,address:address}},function(err,docs){
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
            if (email==null){
                email=worker.email;
            }
            if (contact_no==null){
                contact_no=worker.contact_no;
            }
            if (address==null){
                address=worker.address;
            }
            try{
                console.log(email,contact_no,address);
                models.Worker.updateOne({_id:user.id},{$set:{email:email,contact_no:contact_no,address:address}},function(err,docs){
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
            throw new Error("You didn't have privilege");
        }
    },
    RemoveService:async (parent,{service},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("you cannot do this");
        }
        try{
            models.ServiceProvider.updateOne({_id:sp_id},{$pull:{service:service}},function(err,docs){
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
    RemoveDistrict:async (parent,{district},{models,user})=>{
        const provider=await models.ServiceProvider.findById(user.id);
        const moderator=await models.Moderator.findById(user.id);
        let sp_id=null;
        if (provider){
            sp_id=user.id;
        }else if (moderator){
            sp_id=moderator.serviceProvider;
        }else{
            throw new Error("you cannot do this");
        }
        try{
            models.ServiceProvider.updateOne({_id:sp_id},{$pull:{workingRange:district}},function(err,docs){
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
}
