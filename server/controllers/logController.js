const Log = require('../models/logs');
const mongoose = require("mongoose");

const getAllLogs = async (req, res) => {
  try {
    const userId = req.params.userId;
    const logs = await Log.find({ user: userId }).sort({ timestamp: 'desc' });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch logs.' });
  }
};

const postLog = async (req,res) => {
    //const userId = req.params.userId;
    const { content } = req.body;

    try {
      //const log = new Log({ user: userId, logMessage });
        const log = new Log({ logMessage : content });
        console.log(log)
      await log.save();
      res.status(201).json({ message: "Log saved successfully." });
    } catch (err) {
      res.status(500).json({ error: "Unable to save log." });
    }
}

module.exports = {
    getAllLogs,
    postLog
}