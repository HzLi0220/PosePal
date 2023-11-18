const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserService = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = { ...userData }
  newUser.password = hashedPassword;
  return userDao.createUser(newUser);
};

const getUserInfoService = async (column, value) => {
  return userDao.getUser(column, value);
};

const loginService = async (email, password) => {
  const user = await userDao.getUser('email', email);
  if (!user) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign({ id: user.id }, privateKey, {
    expiresIn: '1h',
    algorithm: 'RS256'
  });
  return { user, token };
};

module.exports = { createUserService, getUserInfoService, loginService };
