const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let User = new Schema(
  {
    username: { type: String, default: "", trim: true },
    email: { type: String, trim: true, default: "", lowercase: true },
    password: { type: String, trim: true },
  },
  { versionKey: false, timestamps: true }
);

// Hash the password before saving
User.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", User);
