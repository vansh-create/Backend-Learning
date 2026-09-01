const userModel = require("../models/user.model")
const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")

async function createPost(req, res) {

    const token = req.cookies.token

    // Jab token nahi hua tab rokega
    if (!token) {
        res.status(401).json({
            "message": "Unauthorized Access"
        })
    }

    // Jab token galat hua tab rokega
    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            "message": "Unauthorized Access"
        })
    }

    // Logic for creating post
    const { img, caption } = req.body
    postModel.create({
        img, caption
    })
 
    const id = jwt.decode(token).id
    const user = await userModel.findOne({ "_id": id })

    res.status(201).json({
        message: "Post Created Successfully",
        decode: user
    })
}

module.exports = { createPost }