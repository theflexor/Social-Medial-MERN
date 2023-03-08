import express from 'express'

import {
    addRemoveFriend,
    getUser,
    getUserFriends,
} from '../controllers/user.controllers.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// READ
router.get('/:id', verifyToken, getUser)
router.get('/:id/friends', verifyToken, getUserFriends)

// UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend)

export default router
