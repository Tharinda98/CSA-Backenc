const Query=require('./Query');
const Customer=require('./Customer');
const ServiceProvider=require('./ServiceProvider');
const Message=require('./MessageQueries');
const Admin=require('./Admin');
const Worker=require('./Worker');
const Moderator=require('./Moderator');
const RoleQuery=require('./RoleQuery');
const UniqueSearchQueries=require('./UniqueSearchQueries');
module.exports={
    ...Query,
    ...Customer,
    ...ServiceProvider,
    ...Message,
    ...Admin,
    ...Worker,
    ...Moderator,
    ...RoleQuery,
    ...UniqueSearchQueries
}
