const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    const { username, email, password, role } = req.body

    const isUserExist = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (isUserExist) {
        return res.status(201).json({
            "message": "User already exist.",
        })
    }

    const user = await userModel.create({
        username: username,
        email: email,
        password: password,
        role: role
    })

    const token = jwt.sign({id: user._id, role: user.role }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        "message": "User registerd successfully",
        "user":user
    })
}

module.exports = { registerUser }