
require("dotenv").config()
const express = require("express");
const cors = require("cors")
const app = express();
require("./models")
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
//================ All Routers Paths =========================
const router = require("./routers/index.js");
app.use("/users", router);
app.get("", (req, res) => { res.send("Hello NODE") })
app.listen(port, () => console.log("app is listening on:" + port))