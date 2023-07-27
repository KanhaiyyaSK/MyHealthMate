const Streak = require("../models/streak");

// Fetch streak for a user
// app.get("/api/streaks/:userId", async (req, res) => {
const getStreak = async (req, res) => {
  try {
    const userId = req.params.userId;
    const streak = await Streak.findOne({ userId });
    if (streak) {
      res.json({ currentStreak: streak.currentStreak });
    } else {
      res.status(404).json({ error: "Streak not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Increment the streak for a user
// app.post("/api/streaks/increment", async (req, res) => {
const increamentStreak = async (req, res) => {
  try {
    const userId = req.params.userId;
    const streak = await Streak.findOne({ user: userId });
    if (streak) {
      streak.currentStreak += 1;
      await streak.save();
      res.json({ currentStreak: streak.currentStreak });
    } else {
      const newStreak = new Streak({ user: userId, currentStreak: 1 });
      await newStreak.save();
      res.json({ currentStreak: newStreak.currentStreak });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getStreak, increamentStreak };
