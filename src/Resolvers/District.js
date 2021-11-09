module.exports = {
    province: async (District,args,{models})=>{
        return await models.Province.findById(District.province);
    }
}