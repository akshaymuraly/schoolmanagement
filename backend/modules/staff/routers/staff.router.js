const Router = require("express").Router();
const { authValidation } = require("../../common/controllers/auth.controller");
const { studentRegister } = require("../controllers/staff.controller");

Router.post(
  "/student-register",
  authValidation(["Staff", "Admin"]),
  studentRegister
);

module.exports = Router;
