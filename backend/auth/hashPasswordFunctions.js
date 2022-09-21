// import bycrypt from bcryptjs
const bcrypt = require("bcryptjs");

// function that hash the password we receive
const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

// function to compare password using bycrypt
const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);

  return result;
};

module.exports = { hashPassword, comparePassword };
