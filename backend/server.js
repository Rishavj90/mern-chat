import "dotenv/config"
import express from "express"
import connectDB from "./lib/connectDB.js"
import AuthRouter from "./routes/auth.routes.js"
import MsgRouter from "./routes/messages.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

// route
app.use('/api/auth', AuthRouter)
app.use('/api/msg', MsgRouter)

connectDB().then(()=>app.listen(process.env.PORT, ()=>console.log("app running")))
