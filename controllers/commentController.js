const db = require("../models")
const Comment = db.comments

const addComment = async (req, res) => {
    const data = {
        title: req.body.title,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }
    await Comment.create(data)
    res.send({ stasusCode: 200, msg: "You have commented successfully" })
}
module.exports = {
    addComment,
}