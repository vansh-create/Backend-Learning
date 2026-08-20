const express = require("express");
const app = express();
app.use(express.json())

let notes = []

app.post("/", (req, res)=>{
    notes.push(req.body)

    res.status(201)
    console.log(notes)
})



module.exports = app