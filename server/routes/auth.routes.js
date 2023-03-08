import express from 'express'

import { login } from '../controllers/auth.contollers.js'

const router = express.Router()

router.post('/login', login)

export default router
