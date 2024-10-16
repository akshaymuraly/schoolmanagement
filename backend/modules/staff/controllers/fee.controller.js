const CustomError = require("../../../middlewares/CustomError");
const Student = require("../models/studentDetails.model");
const AsyncHandler = require("../../../middlewares/AsyncHandler");
const FeeRegistraion = require("../models/feeDetails.model")


const registerFeePainment = AsyncHandler(async (req,res,next)=>{
    const {userId} = req.params;
    const registeredUser = 
})