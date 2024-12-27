const {
  catchAsync,
  sendResponse,
  sendMessageResponse,
} = require("../../helper/common");
const todoService = require("../../services/userServices/todo");
const { appConstant } = require("../../Config/constant/appConstant");

exports.insert = catchAsync(async (req, res) => {
  let { title, description, status } = req.body;
  let userId = req.user.userId;
  let dataToInsert = { title, description, userId, status };
  console.log(dataToInsert, "dataToInsert");

  let dbOperation = await todoService.insert(dataToInsert);
  console.log(dbOperation, "dbOperation");

  if (dbOperation) {
    return sendResponse(res, appConstant.DATAINSERTED);
  }
  sendMessageResponse(res, appConstant.DATANOTINSERTED, 400);
});

exports.update = catchAsync(async (req, res) => {
  let { title, description, status, id } = req.body;
  let userId = req.user.userId;
  let dataToUpdate = { title, description, status, id };
  console.log(dataToUpdate, "dataToUpdate");
  let dbOperation = await todoService.update(dataToUpdate);
  if (dbOperation) {
    return sendResponse(res, appConstant.DATAUPDATED);
  }
  sendMessageResponse(res, appConstant.DATANOTUPDATED, 400);
});

exports.delete = catchAsync(async (req, res) => {
  let id = req.query.id;
  let dataToDelete = { id: id };
  console.log(dataToDelete, "dataToDelete");
  let dbOperation = await todoService.delete(dataToDelete);
  if (dbOperation) {
    return sendResponse(res, appConstant.DATADELETED);
  }
  sendMessageResponse(res, appConstant.DATANOTDELETED, 400);
});

exports.getAll = catchAsync(async (req, res) => {
  let userId = req.user.userId;
  let criteria = { userId };
  let dbOperation = await todoService.getAll(criteria);
  console.log(dbOperation, "dbOperation");
  if (dbOperation) {
    return sendResponse(res, dbOperation, appConstant.SUCCESS, 200);
  }
  sendMessageResponse(res, appConstant.SOMETHINGWENTWRONG, 400);
});
