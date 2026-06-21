import "dotenv/config"
import express, { Router } from "express"
import connectDB from "./lib/connectDB.js"
import router from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())

// route
app.use('/api', router)

connectDB().then(()=>app.listen(process.env.PORT, ()=>console.log("app running")))
