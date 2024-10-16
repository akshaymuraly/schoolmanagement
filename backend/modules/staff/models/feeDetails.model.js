const mongoose = require("mongoose");

const feeSchema = mongoose.Schema({
  FeeType: {
    required: true,
    type: String,
  },
  Amount: {
    required: true,
    type: Number,
  },
  PaymentDate: {
    required: true,
    type: Date,
    default: Date.now,
  },
  Remarks: {
    required: true,
    type: String,
  },
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
});

module.exports = mongoose.model("feeDetail", feeSchema);
