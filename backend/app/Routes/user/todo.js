const express = require("express");
const Route = express.Router();
const Controller = require("../../Controllers/userController");
const userValidation = require("../../Validation/user");
const { userAuth } = require("../../helper/jwtHelpper");

Route.post("/todo/insert", userAuth, Controller.Todo.insert);
Route.put("/todo/update", userAuth, Controller.Todo.update);
Route.get("/todo/getall", userAuth, Controller.Todo.getAll);
Route.delete("/todo/delete", userAuth, Controller.Todo.delete);

module.exports = Route;
