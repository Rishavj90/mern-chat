import mongoDB from "mongoose";

const msgSchema = new mongoDB.Schema({
    sender_id : {
        type : mongoDB.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    reciever_id : {
        type : mongoDB.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {type: String},
    image : {type: String}
}, {timestamps : true})

const Msgdb = mongoDB.model("Msgdb", msgSchema)

export default Msgdb
