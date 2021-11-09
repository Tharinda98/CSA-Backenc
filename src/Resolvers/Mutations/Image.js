module.exports={
    saveImage:async (parent,{name,url,description},{models})=>{
        try{
            return models.Images.create({
                name:name,
                url:url,
                description:description
            });
        }catch (err){
            console.log(err);
            throw new Error("image didn't store");
        }

    }
}
