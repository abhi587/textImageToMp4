const express = require('express');
const router = express.Router();
const UserController = require('../controllers/didcontroller')


router.get("/test-me", function (req, res) {
    res.send("Api is working fine!")
})


//=== text and image's source_url is used so that it will send a key in responce
router.post("/text", UserController.textToMp4)

//== that key is used to get the video (d-id is used as third party api)
router.get("/mp4/:key", UserController.getMp4)

//== test api (to Test eleven-Labs api to change text into speech and it will be stored in the locals)
router.post("/change", UserController.textToSpeech)




module.exports = router;