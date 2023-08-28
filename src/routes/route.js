const express = require('express');
const router = express.Router();
const UserController = require('../controllers/didcontroller')


router.get("/test-me", function (req, res) {
    res.send("Api is working fine!")
})

router.post("/text", UserController.textToMp4)

router.get("/mp4/:key", UserController.getMp4)

router.post("/change", UserController.textToSpeech)




module.exports = router;