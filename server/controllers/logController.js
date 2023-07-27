<<<<<<< HEAD
const Log = require("../models/logs");
=======
const Log = require('../models/logs');
>>>>>>> 05a4763e9d1126d6ffb2835e1de5b3e4dac4ec7f
const mongoose = require("mongoose");

const getAllLogs = async (req, res) => {
  try {
    const userId = req.params.userId;
<<<<<<< HEAD
    const logs = await Log.find({ user: userId }).sort({ timestamp: "desc" });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch logs." });
  }
};

const postLog = async (req, res) => {
  //const userId = req.params.userId;
  const { content } = req.body;

  try {
    //const log = new Log({ user: userId, logMessage });
    const log = new Log({ logMessage: content });
    console.log(log);
    await log.save();
    res.status(201).json({ message: "Log saved successfully." });
  } catch (err) {
    res.status(500).json({ error: "Unable to save log." });
  }
};

module.exports = {
  getAllLogs,
  postLog,
};
=======
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
>>>>>>> 05a4763e9d1126d6ffb2835e1de5b3e4dac4ec7f
