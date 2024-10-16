const User = require("../models/user.model");
const AsyncHandler = require("../../../middlewares/AsyncHandler");
const CustomError = require("../../../middlewares/CustomError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authValidation = (toCheck) =>
  AsyncHandler(async (req, res, next) => {
    const cookie = req?.headers?.cookie;
    if (!cookie) {
      throw new CustomError("No cookie has found!", 401);
    }
    const token = cookie.split("authtoken=")[1];
    if (!token) {
      throw new CustomError("No valid token has found!", 401);
    }
    const { id, role } = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
    if (!toCheck.includes(role)) {
      throw new CustomError("Unauthorized access!", 400);
    }
    req.id = id;
    next();
  });

module.exports = { authValidation };
