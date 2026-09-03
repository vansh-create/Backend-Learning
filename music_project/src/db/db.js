const dns = require("dns")
const mongoose = require("mongoose")

dns.setServers(["8.8.8.8"], ["8.8.4.4"])

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Conencted")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB





