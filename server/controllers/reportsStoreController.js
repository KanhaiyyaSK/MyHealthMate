const ReportStore = require("../models/reportsStoreModel");

const getListOfReports = async (req, res) => {
  try {
    const user_id = req.user._id;
    const reports = await ReportStore.find({ user_id });

    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const createReport = async (req, res) => {
  console.log("createReport");
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const fileUrl = `http://localhost:4000/uploads/${file.filename}`;

    const user_id = req.user._id;

    // save the file name and URL in MongoDB using Mongoose
    const reportStore = new ReportStore({
      reportName: file.originalname,
      reportResourceURL: fileUrl,
      user_id,
    });
    await reportStore.save();

    // send the file URL back to the client
    res.json({ fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getListOfReports,
  createReport,
};
