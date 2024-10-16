const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Name: {
    required: true,
    type: String,
  },
  Email: {
    required: true,
    type: String,
  },
  Password: {
    required: true,
    type: String,
  },
  Role: {
    type: String,
    enum: ["Admin", "Staff", "Librarian"],
    default: "Staff",
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
