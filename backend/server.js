import "dotenv/config"
import express from "express"
import connectDB from "./lib/connectDB.js"
import AuthRouter from "./routes/auth.routes.js"
import MsgRouter from "./routes/messages.routes.js"
import cookieParser from "cookie-parser"

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())

// route
app.use('/api/auth', AuthRouter)
app.use('/api/msg', MsgRouter)

connectDB().then(()=>app.listen(process.env.PORT, ()=>console.log("app running")))
