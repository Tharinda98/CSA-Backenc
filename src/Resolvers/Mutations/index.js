const Admin=require('./Admin');
const Mutation=require('./mutation');
const ServiceProvider=require('./ServiceProvider');
const Message=require('./MessageMutations');
const Moderator=require('./Moderator');
const Customer=require('./Customer');
const Image=require('./Image');
const Worker=require('./Worker');
const ProfileMutation=require('./ProfileMutations');
module.exports={
    ...Admin,
    ...Mutation,
    ...ServiceProvider,
    ...Moderator,
    ...Message,
    ...Customer,
    ...Image,
    ...Worker,
    ...ProfileMutation
}
