import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserModel } from '../models/UserModel.js'

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            accupation,
            password,
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            accupation,
            password: passwordHash,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        const user = await newUser.save()
        res.status(201).json({ user })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const login = async (req, res) => {
    try {
        // find user in database
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })

        // checking exist user
        if (!user) {
            return res.status(400).json({ message: 'User does not exist.' })
        }

        // password validity check
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' })
        }
        
        // create token
        const token = jwt.sign({ id: user._id }, process.env.SECRED_KEY)
        delete user["password"]
        res.status(200).json({ user, token })
    } catch (err) {

        res.status(500).json({ message: err.message })
    }
}
