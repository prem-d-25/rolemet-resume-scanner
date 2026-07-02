import express from 'express'
import multer from 'multer'
import startChat from '../controllers/uploadController.js';
import upload from '../middleware/multer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/startChat', protect, upload.single('resume'), startChat);

export default router;