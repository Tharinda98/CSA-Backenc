const Province=require('./Province');
const District=require('./District');
const SystemAdmin=require('./SystemAdmin');
const Booking=require('./Booking');
const Customer=require('./Customer');
const CustomerAccount=require('./CustomerAccount');
const CustomerReview=require('./CustomerReview');
const Images=require('./Images');
const Membership=require('./Membership');
const Owner=require('./Owner');
const Service=require('./Service');
const NotificationCustomer=require('./NotificationCustomer');
const ServiceProvider=require('./ServiceProvider');
const Moderator=require('./Moderator');
const Worker=require('./Worker');
const WorkStation=require('./WorkStation');
const NotificationSP=require('./NotificationSP');
const NotificationWorker=require('./NotificationWorker');
const Appointment=require('./Appointment');
const Payment=require('./Payment');
const Record=require('./Record');
const Message=require('./Message');

const models={
    Province,
    District,
    SystemAdmin,
    Booking,
    Customer,
    CustomerAccount,
    CustomerReview,
    Images,
    Membership,
    Owner,
    Service,
    ServiceProvider,
    Moderator,
    Worker,
    WorkStation,
    NotificationSP,
    NotificationCustomer,
    NotificationWorker,
    Appointment,
    Payment,
    Record,
    Message
};
module.exports=models;
