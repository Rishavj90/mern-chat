import express from "express"
import protect from "../middleware/auth.middleware.js"
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js"

const router = express.Router()

router.get('/users', protect, getUsersForSidebar)
router.get('/:chatId', protect, getMessages)
router.post('/:chatId', protect, sendMessage)

export default router