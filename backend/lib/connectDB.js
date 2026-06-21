import "dotenv/config"
import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("mongodb connected"))
    } catch (error) {
        console.error("mongoDB connection error", error)
    }
}
export default connectDB