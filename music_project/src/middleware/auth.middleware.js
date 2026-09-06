const jwt = require("jsonwebtoken")

async function authMiddleware(req, res, next) {

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

        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            "message": "Error Occured",
            "Error" : error
        })
    }


}

async function authForUser(req, res, next) {

    const token = req.cookies["token"]

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized user."
        })
    }


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)


        if (decoded.role !== "user") {
            return res.status(403).json({
                "message": "You don't have access for listening music."
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            "message": "Error Occured",
            "Error" : error
        })
    }


}



module.exports = {authMiddleware, authForUser}