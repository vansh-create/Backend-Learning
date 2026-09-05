const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model")
const { uploadFile } = require("../services/storage.services")
const jwt = require("jsonwebtoken")



async function createMusic(req, res) {

    const token = req.cookies["token"]

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized user."
        })
    }


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)


        if (decoded.role !== "artist") {
            return res.status(403).json({
                "message": "You don't have access to create music."
            })
        }


        const { title } = req.body
        const file = req.file


        const result = await uploadFile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })

        res.status(201).json({
            "message": "Music Created Successfully.",
            "music": music
        })

    } catch (error) {
        return res.status(401).json({
            "message": "Unauthorized user.",
        })
    }


}


async function createAlbum(req, res) {

    const token = req.cookies["token"]

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized user. !token"
        })
    }


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)


        if (decoded.role !== "artist") {
            return res.status(403).json({
                "message": "You don't have access to create music."
            })
        }

        const { title, musics} = req.body

        const album = await albumModel.create({
            title,
            musics : musics,
            artist: decoded.id
        })


        res.status(201).json({
            "message": "Album Created Successfully.",
            "album": album
        })

    } catch (error) {
        return res.status(401).json({
            "message": "Unauthorized user. error",
            "error" : error
        })
    }


}

module.exports = { createMusic, createAlbum}

