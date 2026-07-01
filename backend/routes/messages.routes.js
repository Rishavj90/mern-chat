import express from "express"
import protect from "../middleware/auth.middleware.js"
import { getMessages, getUsersForSidebar, sendMessage, getUser } from "../controllers/message.controllers.js"

const router = express.Router()

router.get('/users', protect, getUsersForSidebar)
router.get('/getmsg/:chatId', protect, getMessages)
router.post('/send/:chatId', protect, sendMessage)
router.get('/user/:chatId', protect, getUser)

export default router