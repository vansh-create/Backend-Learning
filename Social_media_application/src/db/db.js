const dns = require("dns");
const mongoose = require("mongoose")

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
   await mongoose.connect("mongodb+srv://gameonews8_db_user:VVmaUlsOlV7Vxriq@backend-first-project.4sf6awt.mongodb.net/socialmedia")
   console.log("DB Connected")
}

module.exports = connectDB

