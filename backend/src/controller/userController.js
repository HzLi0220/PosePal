const userService = require("../service/userService");

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
    const user = await userService.getUserInfoService("id", req.userData.id);
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

const addHistoryController = async (req, res) => {
  try {
    const { id } = req.userData;
    const { duration, percentage } = req.body;
    const result = await userService.addHistoryService(
      id,
      duration,
      percentage,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const startController = async (req, res) => {
//   try {
//     const { id } = req.userData;
//     const startTime = new Date();
//     const result = await userService.startService(id, startTime);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const endController = async (req, res) => {
//   try {
//     const { id } = req.userData;
//     const endTime = new Date();
//     const result = await userService.endService(id, endTime);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  createUserController,
  getUserInfoController,
  loginController,
  addHistoryController,
};
