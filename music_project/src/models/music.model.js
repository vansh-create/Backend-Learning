const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema({
   uri:{
    required: true,
    type: String
   },
   title:{
    required: true,
    type: String
   },
   artist:{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref : "user" 
   }
})

const musicModel = mongoose.model("Music", musicSchema)

module.exports = musicModel