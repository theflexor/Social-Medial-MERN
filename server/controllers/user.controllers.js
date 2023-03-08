import { UserModel } from '../models/UserModel.js'

export const getUser = async () => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)),
        )

        const formatFriends = friends.map(
            ({ password, ...userdata }) => userdata,
        )
        res.status(200).json(formatFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// UPDATE

export const addRemoveFriend = async () => {
    try {
        const { id, friendId } = req.params
        const user = UserModel.findByOne(id)
        const friend = await UserModel.findById(friendId)
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
