// server/index.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js'

dotenv.config() // loads .env file first — always call this early

const app = express()

// --- Middleware stack (order matters!) ---

// CORS: tells browser which origin is allowed to call our API
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
  credentials: true               // allows cookies to be sent cross-origin
}))

app.use(express.json())           // parse JSON request bodies
app.use(cookieParser())           // parsee cookies from request headers

// --- Routes ---
app.use('/api/auth', authRoutes)

// --- Start ---
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})