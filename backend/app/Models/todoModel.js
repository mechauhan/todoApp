const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let todo = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "", trim: true },
    description: { type: String, trim: true, default: "" },
    status: {
      type: String,
      trim: true,
      enum: ["pending", "completed"],
      required: true,
      default: "pending",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("todo", todo);
