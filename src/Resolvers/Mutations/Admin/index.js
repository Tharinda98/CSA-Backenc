const AdminSign=require('./AdminMutations');
const approval=require('./ApproveServiceProvider');
const block=require('./blockServiceProvider');
module.exports={
    ...AdminSign,
    ...approval,
    ...block
}

