const Express = require("express");
require("dotenv").config();
const app = Express();
const PORT = process.env.PORT;
const ErroHandler = require("./middlewares/ErrorHandler");
const dbConnection = require("./config/mongoose.config");

// ----------------Routers----------------------------------------------

const userRouter = require("./modules/common/routers/user.router");
const staffRouter = require("./modules/staff/routers/staff.router");
const adminRouter = require("./modules/admin/router/admin.router");
const librarianRouter = require("./modules/librarian/routers/library.router");

// ----------------Middlewares------------------------------------------

dbConnection();
app.use(Express.json());

// ----------------Routes-----------------------------------------------

app.use("/api/staff", staffRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/librarian", librarianRouter);

// ----------------Error handler----------------------------------------

app.use(ErroHandler);

// ----------------Server initializing----------------------------------
app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
