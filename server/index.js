import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

import { register } from './controllers/auth.contollers.js'
import { createPost } from './controllers/post.contollers.js'
import { posts, users } from './data/index.js'
import { verifyToken } from './middleware/auth.middleware.js'
import { PostModel } from './models/Post.model.js'
import { UserModel } from './models/UserModel.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()

app.use(express.json()) // Formats in json
app.use(helmet()) // configuring the header for protection
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json({ limit: '30m', extended: true })) // format check also config
app.use(bodyParser.urlencoded({ limit: '30m', extended: true }))
app.use(cors()) // data access
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))) // create static data

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server has been started' + PORT)
        })

        // PostModel.insertMany(posts)
        // UserModel.insertMany(users)
    })
