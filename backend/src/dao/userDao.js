const db = require('../../db/knex');

const createUser = async (userData) => {
  return db('users').insert({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    history: "[]" // Storing history as text
  });
};

const getUser = async (column, value) => {
  return db('users').where(column, value).first();
};

module.exports = { createUser, getUser };
