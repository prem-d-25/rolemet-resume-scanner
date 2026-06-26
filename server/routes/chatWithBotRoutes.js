import express from 'express'
import multer from 'multer'
import startChat from '../controllers/uploadController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/startChat', upload.single('resume'), startChat);

export default router;