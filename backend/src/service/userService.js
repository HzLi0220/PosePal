const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../dao/userDao");

const createUserService = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = { ...userData };
  newUser.password = hashedPassword;
  return userDao.createUser(newUser);
};

const getUserInfoService = async (column, value) =>
  userDao.getUser(column, value);

const loginService = async (email, password) => {
  const user = await userDao.getUser("email", email);
  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign({ id: user.id }, privateKey, {
    expiresIn: "1h",
    algorithm: "RS256",
  });
  return { user, token };
};

const addHistoryService = async (id, duration, percentage) => {
  const user = await userDao.getUser("id", id);
  const history = JSON.parse(user.history);
  history.push({ duration, percentage });
  return userDao.updateUser(id, "history", JSON.stringify(history));
};

// const startService = async (id, startTime) => {
//   return updateDao.updateUser(id, 'start_time', startTime);
// };

// const endService = async (id, endTime) => {
//   const user = await userDao.getUser('id', id);
//   const startTime = user.start_time;
//   const duration = endTime - startTime;
//   const history = JSON.parse(user.history);
//   history.push(duration);
//   return userDao.updateUser(id, 'history', JSON.stringify(history));
// };

module.exports = {
  createUserService,
  getUserInfoService,
  loginService,
  addHistoryService,
};
