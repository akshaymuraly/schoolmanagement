const mongoose = require("mongoose");

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MOGODB_CONNECTION_URL);
    console.log("DB connected!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnection;
