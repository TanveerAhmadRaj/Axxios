const db = require("../models")
const Post = db.posts
const User = db.users

const addPost = async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id
    }
    await Post.create(data)
    res.send({ statusCode: 200, msg: "Post Added Successfully" })
}
const getPosts = async (req, res) => {
    const allPosts = await Post.findAll({
        include: [
            {
                model: User,
                as: 'user'
            }
        ]
    })
    res.send(allPosts)
}

const getPost = async (req, res) => {
    const id = req.params.id
    const post = await Post.findOne({ where: { id: id } })
    res.send(post)
    console.log(post);
}
const deletePost = async (req, res) => {
    const id = req.params.id
    await Post.destroy({ where: { id: id } })
    res.send({ statusCode: 200, msg: "Post has been deleted successfully" })

}
const UpdatePost = async (req, res) => {
    const id = req.params.id
    const data = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id
    }
    const post = await Post.update(data, { where: { id: id } })
    res.send({ statusCode: 200, msg: "Post has been updated successfully", post: post })
}
module.exports = {
    addPost,
    getPosts,
    getPost,
    deletePost,
    UpdatePost
}