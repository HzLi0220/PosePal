const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/users', userController.createUserController);

router.get('/user', authMiddleware.checkAuth, userController.getUserInfoController);

router.post('/login', userController.loginController);

// router.get('/start', authMiddleware.checkAuth, userController.startController);

// router.get('/end', authMiddleware.checkAuth, userController.endController);


module.exports = router;