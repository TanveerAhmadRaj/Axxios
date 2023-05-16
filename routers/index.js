const postCntrl = require("../controllers/postController")
const userCtrl = require("../controllers/userController")
const commentCtrl = require("../controllers/commentController")
const express = require("express")
const verifyToken = require('../middlewares/verifyJwt');
const router = express.Router()
/* post routes */
router.post("/add-post", verifyToken, postCntrl.addPost)
router.get("/get-posts", verifyToken, postCntrl.getPosts)
router.get("/:id", verifyToken, postCntrl.getPost)
router.delete("/:id", verifyToken, postCntrl.deletePost)
router.put("/:id", verifyToken, postCntrl.UpdatePost)
/* user routes*/
router.post("/register", userCtrl.addUser)
router.post("/login", userCtrl.userLogin)
/* Comments routes */
router.post("/comment", verifyToken, commentCtrl.addComment)
module.exports = router