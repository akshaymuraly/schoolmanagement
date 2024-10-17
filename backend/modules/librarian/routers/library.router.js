const Router = require("express").Router();
const {
  registerLibrary,
  editLibrary,
  deleteLibrary,
} = require("../controllers/library.controller");
const { authValidation } = require("../../common/controllers/auth.controller");

Router.post(
  "/library-register",
  authValidation(["Librarian"]),
  registerLibrary
);
Router.put("/library-edit/:userId", authValidation(["Lybrarian"]), editLibrary);
Router.delete(
  "/library-delete/:userId",
  authValidation(["Lybrarian"]),
  deleteLibrary
);

module.exports = Router;
