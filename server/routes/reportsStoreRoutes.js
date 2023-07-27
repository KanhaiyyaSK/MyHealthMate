const express = require("express");
const multer = require("multer");
const {
  getListOfReports,
  createReport,
} = require("../controllers/reportsStoreController");
const requireAuth = require("../middleware/requireAuth");
const path = require("path");

const router = express.Router();

// require auth for all report routes
router.use(requireAuth);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' folder in your project directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// GET certain report
router.get("/", getListOfReports);

// POST a new report
router.post("/", upload.single("file"), createReport);

module.exports = router;
