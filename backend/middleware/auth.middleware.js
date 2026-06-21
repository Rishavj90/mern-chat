import "dotenv/config.js"
import jwt from "jsonwebtoken";
import user from "../model/users.js";

async function protect(req, res, next) {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({
                message : "Unauthorized - No token provided"
            })
        }
        
        const decode =  await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({
                message : "Unauthorized - invalid token"
            })
        }
        const userDetails = await user.findById(decode.userId).select('-password') 
        if(!userDetails){
            return res.status(404).json({
                message : "user not found"
            })
        }

        req.user = userDetails
        next()
    } catch (error) {
        console.error("protect auth middleware error", error)
        return res.status(500).json({
            message : "Invalid Server Error"
        })
    }
}

export default protect