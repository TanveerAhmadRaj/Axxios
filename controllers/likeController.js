const db = require("../models")
const Like = db.likes

const addUserLike = async (req, res) => {
    const { post_id, user_id } = req.body
    const data = {
        post_id: post_id,
        user_id: user_id
    }
    await Like.create(data)
    res.status(200).json({ message: "User has been liked a post successfully" })
}
const getAllLikes = async (req, res) => {
    const likes = await Like.findAll()
    res.status(200).json({ likes: likes })
}

module.exports = { addUserLike, getAllLikes }