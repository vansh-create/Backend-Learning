const ImageKit = require ("@imagekit/nodejs")

const imageKit = new ImageKit({
    privateKey : "private_9sg3WaxRFf4LT+9627oVFm4Ude0="
})

async function uploadFile(buffer){
    const result = await imageKit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })

    return result;
}

module.exports = uploadFile