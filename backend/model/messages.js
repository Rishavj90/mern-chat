import mongoDB from "mongoose";

const msgSchema = new mongoDB.Schema({
    sender_id : {
        type : mongoDB.Types.ObjectId,
        required : true
    },
    reciever_id : {
        type : mongoDB.Types.ObjectId,
        required : true
    },
    text : {
        type: String,
        required: true
    },
    image : {}
}, {timestamps : true})

const user = mongoDB.model("users", msgSchema)

export default user
