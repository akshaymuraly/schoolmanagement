const Router = require("express").Router();
const { authValidation } = require("../../common/controllers/auth.controller");
const { editUser, deleteUser } = require("../controller/users.controller");

Router.put("/user-update/:userId", authValidation(["Admin"]), editUser);
Router.delete("/user-delete/:userId", authValidation(["Admin"]), deleteUser);

module.exports = Router;
