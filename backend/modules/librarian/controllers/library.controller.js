const AsyncHandler = require("../../../middlewares/AsyncHandler");
const CustomError = require("../../../middlewares/CustomError");
const Library = require("../models/library.model");

const registerLibrary = AsyncHandler(async (req, res, next) => {
  const { Borrw_Date } = req.body;
  const libraryRecord = Library({
    ...req.body,
    Date: Borrw_Date || Date.now(),
  });
  await libraryRecord.save();
  return res.status(200).json({ message: "record saved!", libraryRecord });
});

const editLibrary = AsyncHandler(async (req, res, next) => {
  const { libraryId } = req.params;
  const updateLibrary = await Library.findByIdAndUpdate(
    { _id: libraryId },
    req.body,
    { new: true }
  );
  return res.status(200).json({
    message: "profile updated!",
    status: true,
    updateLibrary,
  });
});

const deleteLibrary = AsyncHandler(async (req, res, next) => {
  const { libraryId } = req.params;
  const deleteLibrary = await Library.findByIdAndDelete({ _id: libraryId });
  if (!deleteLibrary) {
    throw new CustomError("No account found!", 401);
  }
  return res.status(200).json({ message: "Record deleted!", deleteLibrary });
});

module.exports = {
  registerLibrary,
  editLibrary,
  deleteLibrary,
};
