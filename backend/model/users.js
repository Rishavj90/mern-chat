import mongoDB from "mongoose";

const userSchema = new mongoDB.Schema({
    first_name : {
        type : String,
         required : true
    },
    last_name : {
        type : String,
         required : true
    },
    email : {
        type : String,
        required : true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
    profile_pic : {
        type : String,
        default : ""
    }
}, {timestamps : true})

const user = mongoDB.model("User", userSchema)

export default user
