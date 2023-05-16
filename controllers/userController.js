const db = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const User = db.users
//adding a new user:
const addUser = async (req, res) => {
    const { email, password } = req.body;
    if (email === "" || password === "") return res.status(400).json({ "message": "Email or Password is required" })
    const hashedPass = await bcrypt.hash(password, 10);
    const data = {
        email: email,
        password: hashedPass
    }
    const isUser = await User.findOne({ where: { email: data.email } })
    if (isUser) {
        res.send({ statusCode: 401, message: "User already has an account" })
    } else {
        await User.create(data)
        res.send({ statusCode: 200, message: "User has been created successfully!", data: data })
    }
}
//user login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email === "" || password === "") return res.status(400).json({ "message": "Email and Password is required" });
    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) return res.status(401).json({ message: "Email or password is wrong" });
    // //match password
    const matchPass = await bcrypt.compare(password, foundUser.password);
    if (!matchPass) return res.status(401).json({ message: "Email or password is wrong" });
    if (matchPass) {
        const accessToken = jwt.sign({ email: foundUser.email }, 'userToken', { expiresIn: '30s' });
        res.status(200).json({
            messag: 'User is login successfully!',
            token: accessToken
        });
    }
}
module.exports = {
    addUser,
    userLogin
}