const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  Name: {
    required: true,
    type: String,
  },
  Address: {
    required: true,
    type: String,
  },
  Class: {
    required: true,
    type: String,
  },
  StudentId: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("student", studentSchema);
