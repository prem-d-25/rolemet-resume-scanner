import express from "express"
import { protect, restrictTo } from "../middleware/authMiddleware.js"
import { getAllUserData, getProfile } from "../middleware/profileController.js"

const router = express.Router()


router.get('/profile', protect, getProfile)
router.get('/allusers', protect, restrictTo('admin'), getAllUserData)


export default router