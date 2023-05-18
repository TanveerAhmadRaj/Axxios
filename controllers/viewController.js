const db = require("../models")
const View = db.views

const addUserViews = async (req, res) => {
    const { post_id, user_id } = req.body
    const data = {

        user_id: user_id,
        post_id: post_id
    }
    await View.create(data)
    res.status(200).json({ message: "User has been liked a post successfully" })
}
const getAllViews = async (req, res) => {
    const views = await View.findAll()
    res.status(200).json({ Views: views })
}

module.exports = { addUserViews, getAllViews }