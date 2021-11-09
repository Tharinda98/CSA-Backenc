const AppointmentQueries=require('./Appointment');
const PersonalQueries=require('./PersonalQueries');
const NotificationQueries=require('./NotificationQueries');
const DashboardQueries=require('./DashboardQueries');
const SearchQueries=require('./SearchQueries');
const CountQueries=require('./CountQueries');
module.exports={
    ...AppointmentQueries,
    ...PersonalQueries,
    ...NotificationQueries,
    ...DashboardQueries,
    ...SearchQueries,
    ...CountQueries
}
