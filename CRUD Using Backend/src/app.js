const express = require("express");
const app = express();
app.use(express.json())

let notes = []

app.post("/", (req, res)=>{
    notes.push(req.body)

    res.status(201).json({
        "message":"note created successfully"
    })
    console.log(notes)
})

app.get("/", (req, res)=>{
    res.status(200).json({
        "message":"note send successfully",
        "notes":notes
    })
})

app.get("/:index", (req, res)=>{

    const index = req.params.index

    delete notes[index]

    res.status(200).json({
        "message":"note deleted successfully",
        "notes":notes
    })
})



module.exports = app