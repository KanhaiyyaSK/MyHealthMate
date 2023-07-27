const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./userModel"); // Import the User model

const logSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // Reference to the User model
//     required: true,
//   },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  logMessage: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;