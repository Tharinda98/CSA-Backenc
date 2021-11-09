const NotificationMutations=require('./Notification');
const SignIN=require('./SignIN');
module.exports = {
    ...NotificationMutations,
    ...SignIN
}
