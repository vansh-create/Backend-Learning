const mongoose = require("mongoose")

async function connectDB() {
    await mongoose.connect("mongodb+srv://gameonews8_db_user:VVmaUlsOlV7Vxriq@backend-first-project.4sf6awt.mongodb.net/notesDB")

    console.log("Database Connected")
}

module.exports = connectDB