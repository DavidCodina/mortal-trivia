import path from 'path'
import * as dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import 'source-map-support/register'

import { errorHandler, notFound } from 'middleware/errorMiddleware'
import { connectDB } from './db'
import categoryRoutes from './routes/categoryRoutes'
import quizRoutes from './routes/quizRoutes'

dotenv.config()
connectDB()
const app = express()

// Todos:
// - Update package dependencies
// - Migrate from Vitest to Jest
// - Update ESLint
// - Migrate from REST to GraphQL
// - Migrate from Mongoose to Prisma

/* ======================
    Global Middleware
====================== */

// No need to add 'http://localhost:3000' since it's covered
// by process.env.NODE_ENV === 'development' check.
// Otherwise, add allowed domains here...
const allowOrigins: string[] = [
  // 'http://localhost:3000'
  // '...'
]

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else if (allowOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

// Or just do app.use(cors()) for public API.
app.use(cors(corsOptions))
// app.use(morgan('dev'))

// Setting the limit property can help avoid '413 Payload Too Large' errors.
// I think by default it's 100kb.
app.use(express.json({ limit: '50mb' })) // ???
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))

/* ======================
        Routes
====================== */

app.use('/api/categories', categoryRoutes)
app.use('/api/quiz', quizRoutes)
app.use(notFound)
app.use(errorHandler)

/* ======================
        Listen
====================== */

const port = process.env.PORT || 5000

mongoose.connection.once('open', () => {
  console.log('Calling app.listen() now that the database is connected.')
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
})
