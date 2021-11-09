const BookingMutations=require('./booking');
const ReviewMutations=require('./Review');
const PaymentMutations=require('./Payment');
const NotificationMutations=require('./Notification');
const RatingMutations=require('./Rating');
module.exports={
    ...BookingMutations,
    ...ReviewMutations,
    ...PaymentMutations,
    ...NotificationMutations,
    ...RatingMutations
}
