import { PostModel } from '../models/Post.model.js'
import { UserModel } from '../models/UserModel.js'

// CREATE
export const createPost = async () => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await UserModel.findById(userId)
        const newPost = await PostModel({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        })
        await newPost.save()

        const post = await PostModel.find()

        res.status(201).json(post)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// GET
export const getFeedPosts = async () => {
    try {
        const post = await PostModel.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({ userId })
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
export const likePost = async () => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await PostModel.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true },
        )

        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
