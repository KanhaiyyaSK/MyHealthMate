const express = require("express");

const {
    getAllLogs,
    postLog
} = require('../controllers/logController')

const router = express.Router();

router.get("/", getAllLogs);

router.post("/", postLog);
module.exports = router;