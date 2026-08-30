const express = require("express")
const postModel = require("./models/post.model")
const app = express();

app.use(express.json())

app.post("/create-post", async (req, res) => {
    const img = req.body.img
    const caption = req.body.caption

    await postModel.create({
        img: img,
        caption: caption
    })

    res.status(201).json({
        "message": "post created successfully"
    })
})

app.get("/feed", async (req, res) => {

    const data = await postModel.find()

    res.status(200).json({
        "message": "post fetched successfully",
        "data": data
    })
})


module.exports = app