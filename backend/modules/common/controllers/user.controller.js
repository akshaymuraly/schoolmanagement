const userDetails = require("../models/user.model");
const AsyncHandler = require("../../../middlewares/AsyncHandler");
const CustomError = require("../../../middlewares/CustomError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isProduction = process.env.NODE_ENV === "production";

const userSignup = AsyncHandler(async (req, res, next) => {
  const { Name, Email, Password, Role } = req.body;
  const salt = await bcrypt.genSalt(16);
  const CryptedPassword = await bcrypt.hash(Password, salt);
  const User = userDetails({
    Name,
    Email,
    Password: CryptedPassword,
    Role,
  });
  await User.save();
  return res.status(200).json({ message: "User account registered!", User });
});

const userSignin = AsyncHandler(async (req, res, next) => {
  const { Password, Email } = req.body;
  if (!Email || !Password || Password === "" || Email === "") {
    throw new CustomError("Allfields are required", 400);
  }
  const user = await userDetails.findOne({ Email });
  if (!user) {
    throw new CustomError("No account found!", 401);
  }
  const comparePassword = await bcrypt.compare(Password, user.Password);
  if (!comparePassword) {
    throw new CustomError("Invalid email or password !", 401);
  }
  const token = await jwt.sign(
    { id: user._id, role: user.Role },
    process.env.JWT_TOKEN_KEY,
    {
      expiresIn: "1d",
    }
  );
  await res.cookie("authtoken", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60), //60 mins
    sameSite: isProduction ? "strict" : "lax",
    httpOnly: true,
    secure: isProduction,
  });
  return res.json({ message: "Logged in successfully", status: true });
});

module.exports = {
  userSignup,
  userSignin,
};
