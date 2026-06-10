import express from "express"
import { protect, restrictTo } from "../middleware/authMiddleware.js"
import { editProfile, getAllUserData, getProfile } from "../middleware/profileController.js"

const router = express.Router()


router.get('/profile', protect, getProfile)
router.post('/edit-profile', protect, editProfile)
router.get('/allusers', protect, restrictTo('admin'), getAllUserData)


export default router