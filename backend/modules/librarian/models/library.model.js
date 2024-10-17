const mongoose = require("mongoose");

const librarySchema = mongoose.Schema({
  BookName: { type: String, required: true },
  BorrowDate: { type: Date, required: true },
  ReturnDate: { type: Date, default: null },
  Status: { required: true, type: String, enum: ["Borrowed", "Returned"] },
});

module.exports = mongoose.model("library", librarySchema);
