const mongoose=require('mongoose');
module.exports = {
    worker_getMyNotification:async (parent, {offset,page},{models,user})=> {
        console.log(user.id);
        console.log(user._id);
        const worker = await models.Worker.findById(user.id);
        if (!worker) {
            throw new Error("You cannot query this");
        }
        try {
            if (page === 1) {
                return models.NotificationWorker.aggregate([
                    {
                        $match:
                            {
                                worker: mongoose.Types.ObjectId(user.id)
                            }

                    },
                    {
                        $sort:
                            {
                                date: -1
                            }

                    },
                    {
                        $limit: offset
                    }
                ]);
            } else if (page > 1) {
                return models.NotificationWorker.aggregate([
                    {
                        $match:
                            {
                                worker: mongoose.Types.ObjectId(user.id)
                            }

                    },
                    {
                        $sort:
                            {
                                date: -1
                            }

                    },
                    {
                        $skip: offset * (page - 1)

                    },
                    {
                        $limit: offset
                    }
                ]);
            }
        }catch
            (err)
            {
                console.log(err);
                throw new Error("Error in fetching notification");
            }
        }
}
