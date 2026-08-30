const express = require("express")
const postModel = require("./models/post.model")
const app = express();

app.use(express.json())


module.exports = app