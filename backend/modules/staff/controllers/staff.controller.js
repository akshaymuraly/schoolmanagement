const CustomError = require("../../../middlewares/CustomError");
const AsyncHandler = require("../../../middlewares/AsyncHandler");
const studentDetails = require("../models/studentDetails.model");
const { v4: uuid } = require("uuid");

const studentRegister = AsyncHandler(async (req, res, next) => {
  const { Name, Address, Class } = req.body;
  if (
    !Name ||
    !Address ||
    !Class ||
    Name === "" ||
    Address === "" ||
    Class === ""
  )
    throw new CustomError("No field can be empty!", 400);
  const student = studentDetails({
    Name,
    Address,
    Class,
    StudentId: uuid(),
  });

  if (student) {
    return res.status(200).json({ message: "Student registered!", student });
  }
});

module.exports = {
  studentRegister,
};
