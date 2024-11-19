const express = require('express');
const ProfileController = require('../src/controllers/profileController.js');
const ToDoListController = require('../src/controllers/ToDoListController.js');
const AuthVerifyMiddleware = require('../src/middleware/AuthVerifyMiddleware.js');
const router = express.Router();


//user registration
router.post("/CreateProfile",ProfileController.CreateProfile);

//user login
router.post("/UserLogin",ProfileController.UserLogin);

//User details Read

router.get("/SelectProfile",AuthVerifyMiddleware,ProfileController.SelectProfile);

//Update Profile
router.post("/UpdateProfile",AuthVerifyMiddleware,ProfileController.UpdateProfile);


//ToDo Create 

router.post("/CreateToDo",AuthVerifyMiddleware,ToDoListController.CreateToDo);

//ToDo Read 

router.get("/SelectToDo",AuthVerifyMiddleware,ToDoListController.SelectToDo);

//ToDo Update

router.post("/UpdateToDo",AuthVerifyMiddleware,ToDoListController.UpdateToDo);

//ToDo Status Update

router.post("/UpdateStatusToDo",AuthVerifyMiddleware,ToDoListController.UpdateStatusToDo);

//ToDo Delete

router.post("/RemoveToDo",AuthVerifyMiddleware,ToDoListController.RemoveToDo);

// ToDo Select By Status

router.get("/SelectToDoByStatus",AuthVerifyMiddleware,ToDoListController.SelectToDoByStatus);







module.exports = router;

