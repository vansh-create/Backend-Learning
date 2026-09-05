const express = require("express")
const musicController = require("../controllers/music.controller")
const multer = require("multer")
const authMiddleware = require("../middleware/auth.middleware")


const upload = multer({
    storage : multer.memoryStorage()
})


const router = express.Router()

router.post("/upload", authMiddleware.authMiddleware, upload.single("music"), musicController.createMusic)
router.post("/album", authMiddleware.authMiddleware, musicController.createAlbum)

module.exports = router