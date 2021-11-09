module.exports={
    worker_me: async (parent,args,{models,user})=>{
        const worker=await models.Worker.findById(user.id);
        if (!worker){
            throw new Error("You cannot do this");
        }
        return worker;
    }
}
