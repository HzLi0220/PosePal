const express = require("express");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/users", userController.createUserController);

router.get(
  "/user",
  authMiddleware.checkAuth,
  userController.getUserInfoController,
);

router.post("/login", userController.loginController);

router.post(
  "/history",
  authMiddleware.checkAuth,
  userController.addHistoryController,
);

// router.get('/start', authMiddleware.checkAuth, userController.startController);

// router.get('/end', authMiddleware.checkAuth, userController.endController);

module.exports = router;
