const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const generateToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET, { expiresIn: "2d" });
};

module.exports = { generateToken };
