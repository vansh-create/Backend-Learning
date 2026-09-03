const userModel = require("../models/user.model")

async function registerUser(req, res) {
    let user;

    const { username, email, password, role } = req.body

    try {
        user = await userModel.create({
            username: username,
            email: email,
            password: password,
            role: role
        })
    } catch (error) {
        res.status(404).json({
            "message": "User already registerd."
        })
    }


    res.status(201).json({
        "message": "User registerd successfully",
        "user": user
    })
}

module.exports = { registerUser }