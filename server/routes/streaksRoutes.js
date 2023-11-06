const express = require("express");

// controller functions
const {
 getStreak, increamentStreak,
} = require("../controllers/streakController");
const router = express.Router();

// signup route
router.post("/increment", increamentStreak);

// get user details with id
router.get("/:id", getStreak);

module.exports = router;
