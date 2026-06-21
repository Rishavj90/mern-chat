import { generateToken } from "../lib/generateToken.js"
import user from "../model/users.js"
import bcrypt from "bcryptjs"

export async function signup(req, res){
    let is400 = false
    try {
        const {first_name, last_name, email, password} = req.body
        if(!first_name || !last_name || !email || !password){
            is400=true
            throw Error("all field are required")
        }

        if(password.length<8){
            is400=true
            throw Error("password should be at least 8 characters long")
        }

        const check_user = await user.findOne({email : email})
        if(check_user){
            is400=true
            throw Error("user already exits")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        const new_user = new user({
            first_name,
            last_name,
            email,
            password : hashPass
        })

        if(!new_user){
            is400=true
            throw Error("invalid user credentials")
        }else{
            generateToken(new_user._id, res)
            await new_user.save()
            res.status(201).json({
                _id : new_user._id,
                first_name : new_user.first_name,
                last_name : new_user.last_name,
                email : new_user.email,
                profile_pic : new_user.profile_pic
            })
        }

    } catch (error) {
        if(is400){
            res.status(400).json({
                message : error.message
            })
        }else{
            res.status(500).json({
                message : "Internal Server Error"
            })
        }
        console.error("signup error", error)
    }
}

export async function login(req, res){
    let is400 = false
    try {
        const {email, password} = req.body
        if(!email || !password){
            is400=true
            throw Error("all field are required")
        }

        const theUser = await user.findOne({
            email : email
        })
        const isCorrectPass = theUser ? await bcrypt.compare(password, theUser.password) : false
        if(!theUser || !isCorrectPass){
            is400=true
            throw Error("invalid email or password")
        }

        generateToken(theUser._id, res)
        res.status(200).json({
            _id : theUser._id,
            first_name : theUser.first_name,
            last_name : theUser.last_name,
            email : theUser.email,
            profile_pic : theUser.profile_pic
        })

    } catch (error) {
        if(is400){
            res.status(400).json({
                message : error.message
            })
        }else{
            res.status(500).json({
                message : "Internal Server Error"
            })
        }
        console.error("signup error", error)
    }
}

export async function logout(req, res){
    try {
        res.cookie("jwt", "", {
            maxAge : 0
        })
        res.status(200).json({
            message : "logout successful"
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal Server error"
        })
        console.error("logout error", error)
    }
}
