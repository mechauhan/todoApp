const { catchAsync, sendResponse } = require("../../helper/common");
const error = require("http-errors");
const userServices = require("../../services/userServices/auth");
const { jwtSign } = require("../../helper/jwtHelpper");
const { config } = require("./../../Config/constant/infoConstants");
const { appConstant } = require("../../Config/constant/appConstant");
const bcrypt = require("bcryptjs");
// const client = require("../../helper/redis");

exports.register = catchAsync(async (req, res) => {
  let user = await userServices.register(req.body);
  if (!user) throw error.InternalServerError();
  sendResponse(res, user, appConstant.SUCCESSREGISTER);
});

exports.login = catchAsync(async (req, res) => {
  let { password } = req.body;
  let user = await userServices.login(req.body);
  console.log(user, "user 22", password);
  if (!user) throw error.NotFound(appConstant.USERNOTFOUND);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error.Unauthorized(appConstant.INVALIDPASSWORD);
  let token = await jwtSign(user._id.toString(), config.SCOPE.USER);
  if (!token) throw error.InternalServerError();
  sendResponse(res, { token }, appConstant.SUCCESSLOGIN);
});
