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
router.get("/", authMiddleware.authForUser, musicController.getMusic)
router.get("/album", authMiddleware.authForUser, musicController.getAlbum)
router.get("/album/:id", authMiddleware.authForUser, musicController.getAlbumMusic)

module.exports = router