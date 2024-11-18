const express = require('express');
const ProfileController = require('../src/controllers/profileController.js');
const router = express.Router();


//user registration
router.post("/CreateProfile",ProfileController.CreateProfile);






module.exports = router;

