const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        enum: ['artist', 'user'],
        default: "user"
    },

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel