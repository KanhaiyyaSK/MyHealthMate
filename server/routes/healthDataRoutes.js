const express = require("express");
const {
  addHealthData,
  getAllHealthData,
  updateHealthDataField,
} = require("../controllers/healthDataController");
//const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
// require auth for all workout routes
//router.use(requireAuth);

router.get("/:id", getAllHealthData);

router.post("/:id", addHealthData);

router.patch("/", updateHealthDataField);

module.exports = router;
