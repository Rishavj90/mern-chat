import express from "express"
import { signup, login, logout, updateProfilePic, checkAuth } from "../controllers/auth.controllers.js"
import protect from "../middleware/auth.middleware.js"
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/update-profile', protect, updateProfilePic)
router.get('/check', protect, checkAuth)

export default router