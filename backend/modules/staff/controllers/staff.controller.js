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
  await student.save();
  if (student) {
    return res.status(200).json({ message: "Student registered!", student });
  }
});

const studentUpdate = AsyncHandler(async (req, res, next) => {
  const { studentId } = req.params;
  const updateUser = await studentDetails.findByIdAndUpdate(
    { _id: studentId },
    req.body,
    { new: true }
  );
  return res.status(200).json({
    message: "Account updated!",
    status: true,
    updateUser,
  });
});

const studentDelete = AsyncHandler(async (req, res, next) => {
  const { studentId } = req.params;
  const deleteStudent = await studentDetails.findByIdAndDelete({
    _id: studentId,
  });
  if (!deleteFee) {
    throw new CustomError("No account found!", 401);
  }
  return res.status(200).json({ message: "Record deleted!", deleteStudent });
});

module.exports = {
  studentRegister,
  studentUpdate,
  studentDelete,
};
