module.exports = {
    booking: async (parent,{by,to,workStationAddress,workStationDistrict,description},{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You have to log in to our system to book");
        }
        try{
            return models.Booking.create({
                by:user.id,
                to:to,
                workStationAddress:workStationAddress,
                workStationDistrict:workStationDistrict,
                description:description
            });
        }catch (err){
            console.log(err);
            throw new Error("Booking didn't happen");
        }

    },
    saveCustomerAccountDetails: async (parent,{acc_no,valid_date,name_on_card},{models,user})=>{
        const customer=await models.Customer.findById(user.id);
        if (!customer){
            throw new Error("You have to log in to our system");
        }
        try{
            return models.CustomerAccount.create({
                card_holder:user.id,
                acc_no:acc_no,
                valid_date:valid_date,
                name_on_card:name_on_card
            });
        }catch (err){
            console.log(err);
            throw new Error("Error in storing the details of the customer account")
        }
    }
}
