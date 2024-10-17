const Router = require("express").Router();
const { authValidation } = require("../../common/controllers/auth.controller");
const {
  studentRegister,
  studentUpdate,
  studentDelete,
} = require("../controllers/staff.controller");
const {
  registerFeePayment,
  feeUpdate,
  feeDelete,
} = require("../controllers/fee.controller");

Router.post(
  "/student-register",
  authValidation(["Staff", "Admin"]),
  studentRegister
);
Router.put(
  "/student-update/:studentId",
  authValidation(["Staff", "Admin"]),
  studentUpdate
);
Router.delete(
  "/student-delete/:studentId",
  authValidation(["Staff", "Admin"]),
  studentDelete
);
Router.post(
  "/fee-register/:studentId",
  authValidation(["Staff"]),
  registerFeePayment
);
Router.put("/fee-update/:feeId", authValidation(["Staff"]), feeUpdate);
Router.delete("/fee-delete/:feeId", authValidation(["Staff"]), feeDelete);

module.exports = Router;
