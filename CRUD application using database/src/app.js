const express = require("express");
const noteModel = require("./models/note.model")
const app = express();


app.use(express.json())

app.post("/notes", async (req, res) => {

    const data = req.body;

    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        "message": "note created successfully"
    })

})

app.get("/notes", async (req, res) => {

    const data = await noteModel.find()

    res.status(200).json({
        "message": "note send successfully",
        "notes": data
    })

})

app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id

    await noteModel.findByIdAndDelete(id);
    const data = await noteModel.find()

    res.status(200).json({
        "message": "note deleted successfully",
        "notes": data
    })
})

app.patch("/notes/:id", async (req, res) => {

    const id = req.params.id
    const des = req.body.description
    const title = req.body.title

    await noteModel.findByIdAndUpdate(id, {
        "title": title,
        "description": des
    }, { new: true });

    const data = await noteModel.find()

    res.status(200).json({
        "message": "note added successfully",
        "notes": data
    })
})



module.exports = app