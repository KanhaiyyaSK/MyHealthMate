const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    currentStreak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Streak = mongoose.model("Streak", streakSchema);

module.exports = Streak;
