const express = require('express');
const ProfileController = require('../src/controllers/profileController.js');
const AuthVerifyMiddleware = require('../src/middleware/AuthVerifyMiddleware.js');
const router = express.Router();


//user registration
router.post("/CreateProfile",ProfileController.CreateProfile);

//user login
router.post("/UserLogin",ProfileController.UserLogin);

//User details

router.get("/SelectProfile",AuthVerifyMiddleware,ProfileController.SelectProfile);







module.exports = router;

