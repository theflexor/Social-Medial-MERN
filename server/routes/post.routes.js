import express from 'express'

import {
    getFeedPosts,
    getUserPosts,
    likePost,
} from '../controllers/post.contollers.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', verifyToken, getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

router.patch('/:id/like', verifyToken, likePost)

export default router
