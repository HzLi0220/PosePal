const userService = require('../service/userService');

const createUserController = async (req, res) => {
  try {
    const user = await userService.createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserInfoController = async (req, res) => {
  try {
    const user = await userService.getUserInfoService('id', req.userData.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginService(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { createUserController, getUserInfoController, loginController };
