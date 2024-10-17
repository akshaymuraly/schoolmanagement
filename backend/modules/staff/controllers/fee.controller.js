const CustomError = require("../../../middlewares/CustomError");
const Student = require("../models/studentDetails.model");
const AsyncHandler = require("../../../middlewares/AsyncHandler");
const FeeRegistraion = require("../models/feeDetails.model");

const registerFeePayment = AsyncHandler(async (req, res, next) => {
  const { studentId } = req.params;
  const { FeeType, Amount, Remarks } = req.body;
  const registerFee = FeeRegistraion({
    Student: studentId,
    FeeType,
    Amount,
    Remarks,
  });
  await registerFee.save();
  return res.status(200).json({ message: "Record saved!", registerFee });
});

const feeUpdate = AsyncHandler(async (req, res, next) => {
  const { feeId } = req.params;
  const updateFee = await FeeRegistraion.findByIdAndUpdate(
    { _id: feeId },
    { ...req.body, PaymentDate: Date.now() },
    { new: true }
  );
  return res.status(200).json({
    message: "Fee updated!",
    status: true,
    updateFee,
  });
});

const feeDelete = AsyncHandler(async (req, res, next) => {
  const { feeId } = req.params;
  const deleteFee = await FeeRegistraion.findByIdAndDelete({ _id: feeId });
  if (!deleteFee) {
    throw new CustomError("No account found!", 401);
  }
  return res.status(200).json({ message: "Record deleted!", deleteFee });
});

module.exports = {
  registerFeePayment,
  feeUpdate,
  feeDelete,
};
