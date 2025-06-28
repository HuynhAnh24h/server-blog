import express from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './configs/database.js'
import appRouter from './routes/index.js'
import {multerErrorHandler} from "./helpers/handleError.js"
import './configs/cloudinary.js';
configDotenv()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}))

connectDB()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
    process.exit(1)
  })

// Listen server
const PORT = process.env.PORT || 3000


app.use((error,req, res, next) => {
 const statusCode = error.statusCode || 500
 const message = error.message || 'Internal Server Error'
 res.status(statusCode).json({
   status: 'error',
   statusCode,
   message,
 })
})

app.use(appRouter)
app.use(multerErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})