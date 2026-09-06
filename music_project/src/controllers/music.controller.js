const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model")
const { uploadFile } = require("../services/storage.services")



async function createMusic(req, res) {
    const { title } = req.body
    const file = req.file


    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        "message": "Music Created Successfully.",
        "music": music
    })
}


async function createAlbum(req, res) {

    const { title, musics } = req.body

    const album = await albumModel.create({
        title,
        musics: musics,
        artist: req.user.id
    })

    res.status(201).json({
        "message": "Album Created Successfully.",
        "album": album
    })

}

async function getMusic(req, res) {


    try {
        const music = await musicModel.find().populate("artist", "username")

        res.status(200).json({
            "message": "Music Fetched Successfully.",
            "Music": music
        })
    } catch (error) {
        res.status(404).json({
            "message": "Error Occoured."
        })
    }
}

async function getAlbum(req, res) {


    try {
        const album = await albumModel.find().select("title artist")

        res.status(200).json({
            "message": "Album Fetched Successfully.",
            "Music": album
        })
    } catch (error) {
        res.status(404).json({
            "message": "Error Occoured."
        })
    }
}

async function getAlbumMusic(req, res) {

    const id = req.params.id

    try {
        const album = await albumModel.findOne({_id: id})
        // .limit(2)
        // .skip(1)
        .populate("artist musics",)

        res.status(200).json({
            "message": "Album Music Fetched Successfully.",
            "Music": album
        })
    } catch (error) {
        res.status(404).json({
            "message": "Error Occoured."
        })
    }
}



module.exports = { createMusic, createAlbum, getMusic, getAlbum, getAlbumMusic }

