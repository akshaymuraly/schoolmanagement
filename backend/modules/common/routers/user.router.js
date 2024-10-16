const Router = require("express").Router();
const { userSignup, userSignin } = require("../controllers/user.controller");
const { authValidation } = require("../controllers/auth.controller");

Router.post("/signup", authValidation(["Admin"]), userSignup);
Router.post("/signin", userSignin);

module.exports = Router;
