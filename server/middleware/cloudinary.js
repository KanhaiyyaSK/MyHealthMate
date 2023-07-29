// middleware/cloudinary.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "MyHealthMate", // The folder name in your Cloudinary account where the reports will be stored
  allowedFormats: ["png", "jpg", "jpeg", "pdf", "doc", "docx", "xls", "xlsx"],
  transformation: [
    {
      width: 800,
      // middleware/cloudinary.js (Continuation)

      crop: "scale",
    },
    { quality: "auto" },
  ], // Transformations to be applied to the uploaded images
  // You can add more transformations or remove some as per your requirements
  params: { resource_type: "auto" },
});

const uploadToCloudinary = multer({ storage });

module.exports = { uploadToCloudinary };
