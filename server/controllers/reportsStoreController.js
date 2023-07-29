const ReportStore = require("../models/reportsStoreModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getListOfReports = async (req, res) => {
  try {
    const user_id = req.user._id;

    // Retrieve all reports for the user from MongoDB
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

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "MyHealthMate", // Optional: You can customize the folder where the files will be stored in Cloudinary
    });

    // Get the file URL from the Cloudinary response
    const fileUrl = result.secure_url;

    const user_id = req.user._id;

    // Save the file name and Cloudinary URL in MongoDB using Mongoose
    const reportStore = new ReportStore({
      reportName: file.originalname,
      reportResourceURL: fileUrl,
      user_id,
    });
    await reportStore.save();

    // Send the file URL back to the client
    res.json({ fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const deleteReportById = async (req, res) => {
  try {
    const user_id = req.user._id;
    const reportId = req.params.id;

    // Find the report by ID and user_id to ensure the user owns the report
    const report = await ReportStore.findOne({ _id: reportId, user_id });

    // If the report doesn't exist or the user is unauthorized, return an error
    if (!report) {
      return res
        .status(404)
        .json({ error: "Report not found or unauthorized to delete" });
    }

    // Delete the report from MongoDB
    await ReportStore.deleteOne({ _id: reportId, user_id });

    // Delete the file from Cloudinary using the public ID
    const public_id = report.reportResourceURL.match(
      /\/MyHealthMate\/(.*)\./
    )[1];
    await cloudinary.uploader.destroy(public_id);

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
module.exports = {
  getListOfReports,
  createReport,
  deleteReportById,
};
