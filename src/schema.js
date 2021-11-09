const { gql }=require('apollo-server-express');
module.exports=gql`
    scalar Date
    scalar DateTime
    
    type Province{
    _id:ID!
    provinceName:String
    }
    
    type District{
    _id:ID!
    province:Province!
    districtName:String!
    }
    
    type SystemAdmin{
    _id:ID!
    username:String!
    profile:String!
    }
    
    type Owner{
    _id:ID!
    owner_name:String!
    owner_NIC:String!
    contact_no:String!
    profile:String!
    }
    
    type Message{
    _id:ID!
    by:String!
    to:String!
    message:String!
    read:Boolean
    received_date:Date!
    }
    
    type Membership{
    _id:ID!
    membership_name:String!
    membership_period:Int!
    membership_value:Int!
    description:String
    }
    
    type ServiceProvider{
    _id:ID!
    username:String!
    name:String!
    address:String!
    contact_no:[String!]!
    email:String!
    no_of_vote:Int!
    rating:Float!
    bank_acc_no:String!
    owner:Owner!
    service:[String]
    membership:Membership!
    workingRange:[String!]!
    joined_at:Date!
    state:String!
    profile:String!
    }
    
    type CustomerReview{
    _id:ID!
    by:Customer!
    to:ServiceProvider!
    createdAt:Date!
    content:String
    rating:Float
    publish:Boolean!
    }
    
    type Moderator{
    _id:ID!
    serviceProvider:ServiceProvider!
    username:String!
    name:String!
    email:String!
    nic:String!
    address:String!
    contact_no:String!
    rating:Float!
    profile:String!
    no_of_vote:Int!
    left_date:Date
    }
    
    type Worker{
    _id:ID!
    serviceProvider:ServiceProvider!
    username:String!
    name:String!
    email:String!
    contact_no:String!
    nic:String!
    address:String!
    rating:Float!
    profile:String!
    no_of_vote:Int!
    left_date:Date
    }
    
    type Appointment{
    _id:ID!
    booking:Booking!
    appointment_id:String!
    starting_date:Date!
    duration:String
    worker:[Worker]
    state:String!
    paid:Boolean!
    finish_date:Date
    cost:Float
    }
    
    type Payment{
    _id:ID!
    from:String!
    to:String!
    appointment:Appointment!
    amount:Float!
    payedOn:Date!
    }
    
    type NotificationCustomer{
    _id:ID!
    customer:Customer!
    message:String!
    date:Date!
    state:String
    }
    
    type NotificationSP{
    _id:ID!
    serviceProvider:ServiceProvider!
    message:String!
    date:Date!
    state:String
    }
    
    type NotificationWorker{
    _id:ID!
    worker:Worker!
    message:String!
    date:Date!
    state:String
    }
    
    type Booking{
    _id:ID!
    by:Customer!
    to:ServiceProvider!
    state:String
    workStationAddress:String!
    workStationDistrict:String!
    workStation:WorkStation
    description:String
    date:Date!
    }
    
    type Service{
    _id:ID!
    service_name:String!
    description:String
    icon:String!
    }
    
    type Image{
    _id:ID!
    name:String!
    url:String!
    description:String
    date:Date!
    }
    
    type Customer{
    _id:ID!
    username:String!
    profile:String
    name:String!
    contact_no:String!
    email:String
    no_of_vote:Int!
    rating:Float!
    joined:Date!
    }
    
    type CustomerAccount{
    _id:ID!
    card_holder:Customer!
    acc_no:String!
    valid_date:String!
    name_on_card:String!
    }
    
    type WorkStation{
    _id:ID!
    address:String!
    district:District!
    customer:Customer!
    }
    
    type Record{
    _id:ID!
    appointment_id:String!
    images:[Image!]!
    }
    
    type CountFeed{
    _id:String!
    Count:Int
    }
    
    type AmountFeed{
    _id:String!
    Amount:Float
    }
    
    type UserFeed{
    _id:ID!
    username:String!
    role:String!
    }
    
   
    type Query{
    SP_me:ServiceProvider!
    Customer_me:Customer!
    moderator_me:Moderator!
    worker_me:Worker!
    getServices:[Service]
    showProvinces:[Province!]!
    showDistricts:[District]
    showDistricts_pagination(offset:Int!,page:Int!):[District!]!
    showOwners:[Owner!]!
    showCustomers:[Customer]
    showSPS:[ServiceProvider]
    showModerators:[Moderator]
    getProvinceID(provinceName:String!):String!
    districtsByProvince(ProvinceName:String!):[District!]!
    showServiceProviders:[ServiceProvider!]!
    checkDistrictOnServiceProvider(districtName:String!):[ServiceProvider]
    getServiceProvidersByService(service:String!):[ServiceProvider]
    getServiceProviderByDistrictService(district:String!,service:String!):[ServiceProvider]
    defaultSorting:[ServiceProvider]
    sortingByRating:[ServiceProvider]
    getMemberships:[Membership]
    getMembership(membership_name:String!):Membership!
    showWorkers:[Worker]
    getMyModerators(offset:Int!,page:Int!):[Moderator]
    getMyWorkers(offset:Int!,page:Int!):[Worker]
    getMyMessages(offset:Int!,page:Int!):[Message] 
    getMyBooking(offset:Int!,page:Int!):[Booking]
    getMyOngoingWorks(offset:Int!,page:Int!):[Appointment]
    getMyWorks(offset:Int!,page:Int!):[Appointment]
    getMyReviews(offset:Int!,page:Int!):[CustomerReview]
    getMyFinishedWorks(offset:Int!,page:Int!):[Appointment]
    getMyUnpaidWorks(offset:Int!,page:Int!):[Appointment]
    getMyNotification(offset:Int!,page:Int!):[NotificationSP]
    worker_getMyAssignedWorks(offset:Int!,page:Int!):[Appointment]
    worker_getMyOngoingWorks(offset:Int!,page:Int!):[Appointment]
    worker_getMyFinishedWorks(offset:Int!,page:Int!):[Appointment]
    worker_getMyNotification(offset:Int!,page:Int!):[NotificationWorker]
    worker_SearchMyOngoingWorks(id:String!):[Appointment]
    worker_SearchMyFinishedWorks(id:String!):[Appointment]
    worker_SearchMyWorks(id:String!):[Appointment]
    customer_getMyNotification:[NotificationCustomer]
    bookingFeed:[CountFeed]
    workStats:[CountFeed]
    finishedWorkStats:[CountFeed]
    worker_workStats:[CountFeed]
    getMyRole:String!
    getAppointment(appointment_id:String!):[Appointment]
    ratingStats:[CountFeed]
    customer_getMyOngoingWorks:[Appointment]
    customer_getMyFinishedWorks:[Appointment]
    customer_getMyWorks:[Appointment]
    customer_getMyBookings:[Booking]
    getCountWorkers:[CountFeed]
    getCountReviews:[CountFeed]
    getCountAppointments:[CountFeed]
    getCountBooking:[CountFeed]
    getCountMessages:[CountFeed]
    getCountNotification:[CountFeed]
    getCountModerators:[CountFeed]
    getCountAssignedAppointments:[CountFeed]
    getModerator(username:String!):[Moderator]
    getWorker(username:String!):[Worker]
    getMySP:ServiceProvider
    getCustomerReview(username:String!):[CustomerReview]
    searchBooking(username:String!):[Booking]
    searchFinishAppointment(id:String!):[Appointment]
    searchOpenAppointment(id:String!):[Appointment]
    searchSPByUsername(username:String!):[ServiceProvider]
    UniqueSearchAppointment(appointment:ID!):Appointment
    UniqueSearchModerator(moderator:ID!):Moderator
    UniqueSearchWorker(worker:ID!):Worker
    UniqueSearchSP(provider:ID!):ServiceProvider
    UniqueGetCustomerReview(username:String!):[CustomerReview]
    UniqueSearchBooking(username:String!):[Booking]
    CheckUsername(username:String!):Boolean
    CheckAppointmentID(appointment_id:String!):Boolean
    getWorkerNotification(worker:ID!,offset:Int!,page:Int!):[NotificationWorker]
    getCountWorkerNotification(worker:ID!):[CountFeed]
    getReviewsOfServiceProviders(provider:ID!):[CustomerReview]
    getAppointmentAmount(appointment:ID!):[Appointment]
    admin_getOpenSP:[ServiceProvider]
    admin_getDateWiseTotalPayment:[AmountFeed]
    admin_getSpecificDateTotalPayment(date:String!):[AmountFeed]
    admin_getDateWiseTotalPayableAmount:[AmountFeed]
    admin_getSpecificDateWiseTotalPayableAmount(date:String!):[AmountFeed]
    customer_getMyUnpaidWorks:[Appointment]
    SP_CheckWorkerUsernameAvailability(username:String!):Worker
    getMe:[UserFeed]
    }
    
    type Mutation{
    signUPAdmin(username:String!,password:String!):SystemAdmin!
    signINAdmin(username:String!,password:String!):String!
    signUPSP(username:String!,password:String!,name:String!,address:String!,contact_no:[String!]!,email:String!,bank_acc_no:String!,owner:ID!,service:[String!]!,membership:ID!,workingRange:[String]!):ServiceProvider!
    signINSP(username:String!,password:String!):String!
    signUPCustomer(username:String!,password:String!,name:String!,contact_no:String!,email:String!):Customer!
    signINCustomer(username:String!,password:String!):String!
    signINModerator(username:String!,password:String!):String!
    signINModSP(username:String!,password:String!):String!
    signINWorker(username:String!,password:String!):String!
    addService(service_name:String!,icon:String!):Service!
    addModerator(username:String!,password:String!,name:String!,nic:String!,email:String!,contact_no:String!,address:String!):Moderator!
    addProvince(provinceName:String!):Province!
    addDistrict(province:ID!,districtName:String!):District!
    addOwner(owner_name:String!,owner_NIC:String!,contact_no:String!):Owner!
    addMembership(membership_name:String!,membership_period:Int!,membership_value:Int!):Membership!
    addWorker(username:String!,password:String!,name:String!,nic:String!,email:String!,contact_no:String!,address:String!):Worker!
    approveServiceProvider(username:String!):Boolean!
    blockServiceProvider(username:String!):Boolean!
    saveCustomerAccountDetails(acc_no:String!,valid_date:String!,name_on_card:String!):CustomerAccount!
    sendReview(to:ID!,rating:Float!,content:String):CustomerReview!
    updateCustomerReview(CustomerReview:ID!):Boolean
    sendMessage(to:String!,message:String!):Message!
    booking(to:ID!,workStationAddress:String!,workStationDistrict:String!,description:String!):Booking!
    appointment(booking:ID!,appointment_id:String!,starting_date:Date!,duration:String!,worker:[ID],cost:Float!):Appointment!
    assignWorker(appointment:ID!,worker:ID!):Boolean
    confirmBooking(id:ID!):Boolean
    cancelBooking(id:ID!):Boolean
    initiateAppointment(appointment_id:String!):Boolean
    finishAppointment(appointment_id:String!):Boolean
    payment(from:String!,to:String!,appointment:ID!,amount:Float!):Payment!
    confirmPayment(appointment:ID!):Boolean
    saveImage(name:String!,url:String!,description:String):Image!
    addToCustomerNotification(customer:ID!,message:String!):NotificationCustomer!
    addToServiceProviderNotification(serviceProvider:ID!,message:String!):NotificationSP!
    addToWorkerNotification(worker:ID!,message:String!):NotificationWorker!
    CustomerReadNotification(id:ID!):Boolean!
    ServiceProviderReadNotification(id:ID!):Boolean!
    WorkerReadNotification(id:ID!):Boolean!
    setPassword(password:String!):Boolean!
    setProfilePic(picture:String!):Boolean!
    readMessage(id:ID):Boolean!
    sendRatingToCustomer(Customer:ID!,rating:Int!):Boolean!
    sendRatingToWorker(worker:ID!,rating:Int!):Boolean!
    removeWorker(worker:ID!):Boolean
    removeModerator(moderator:ID!):Boolean
    pushService(service:String!):Boolean
    pushDistrict(district:String!):Boolean
    RemoveService(service:String!):Boolean
    RemoveDistrict(district:String!):Boolean
    editInfo(email:String,contact_no:String,address:String):Boolean
    }
`;
