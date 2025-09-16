
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Mobile must be 10-15 digits"], // adjust as needed
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // exclude from queries by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
