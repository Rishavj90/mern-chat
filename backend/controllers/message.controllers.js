import Msgdb from "../model/messages.js"
import user from "../model/users.js"
import cloudinary from "../lib/cloudinary.js"

export async function getUser(req, res) {
    try {
        const userId = req.params.chatId
        const chatUser = await user.findById(userId).select("-password")
        return res.status(200).json(chatUser)
    } catch (error) {
        console.error("getUser", error)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

export async function getUsersForSidebar(req, res) {
    try {
        const loggedInUser = req.user._id
        const users = await user.find({_id : {$ne : loggedInUser}}).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        console.error("getUsersForSidebar error", error)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

export async function getMessages(req, res) {
    try {
        const loggedInUser = req.user._id
        const chatUser = req.params.chatId
        const messagesBW = await Msgdb.find({
            $or : [
                {sender_id : loggedInUser, reciever_id : chatUser},
                {sender_id : chatUser    , reciever_id : loggedInUser}
            ]
        })
        return res.status(200).json(messagesBW)
    } catch (error) {
        console.error("getMessages error", error)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

export async function sendMessage(req, res) {
    try {
        const loggedInUser = req.user._id
        const chatUser = req.params.chatId
        const {text, image} = req.body
        
        let imageUrl =""
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMsg = new Msgdb({
            sender_id : loggedInUser,
            reciever_id : chatUser,
            text : text,
            image : imageUrl
        })

        await newMsg.save()

        // socket.io real-time feature

        return res.status(201).json(newMsg)

    } catch (error) {
        console.error("send message error", error)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}