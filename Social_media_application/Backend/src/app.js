const express = require("express")
const uploadFile = require("./services/storage.service")
const postModel = require("./models/post.model")
const multer = require("multer")
const cors = require("cors")


const upload = multer({storage : multer.memoryStorage()})
const app = express();

app.use(cors())
app.use(express.json())

app.post("/create-post", upload.single("img") , async (req, res) => {
    const caption = req.body.caption
    const img = await uploadFile(req.file.buffer)

    await postModel.create({
        img: img.url,
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