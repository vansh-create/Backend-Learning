const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    "img": String,
    "caption": String
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel