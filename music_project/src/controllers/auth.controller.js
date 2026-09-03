const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body

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
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username: username,
        email: email,
        password: hash,
        role: role
    })



    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        "message": "User registerd successfully",
        "user": user
    })
}


async function loginUser(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (!user) {
         return res.status(201).json({
            "message": "Invalid Credientials.",
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(201).json({
            "message": "Invalid Credientials.",
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)



    res.status(200).json({
        "message": "Login succefully",
        "user": user
    })
}

module.exports = { registerUser, loginUser }

