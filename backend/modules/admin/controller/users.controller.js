const AsyncHandler = require("../../../middlewares/AsyncHandler");
const CustomError = require("../../../middlewares/CustomError");
const userDetails = require("../../common/models/user.model");

const editUser = AsyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const updateUser = await userDetails.findByIdAndUpdate(
    { _id: userId },
    req.body,
    { new: true }
  );
  return res.status(200).json({
    message: "profile updated!",
    status: true,
    updateUser,
  });
});

const deleteUser = AsyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const deleteUser = await userDetails.findByIdAndDelete({ _id: userId });
  if (!deleteUser) {
    throw new CustomError("No account found!", 401);
  }
  return res.status(200).json({ message: "Record deleted!", deleteUser });
});

module.exports = {
  editUser,
  deleteUser,
};
