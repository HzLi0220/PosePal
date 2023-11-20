const db = require("../../db/knex");

const createUser = async (userData) =>
  db("users").insert({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    history: "[]", // Storing history as text
  });

const getUser = async (column, value) =>
  db("users").where(column, value).first();

const updateUser = async (id, column, value) =>
  db("users")
    .where("id", id)
    .update({ [column]: value });

module.exports = { createUser, getUser, updateUser };
