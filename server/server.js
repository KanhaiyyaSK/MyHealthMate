//require dotenv to read .env variables into Node
require("dotenv").config();
const path = require("path");
const Streak = require("./models/streak");
//require express to create and configure our HTTP server
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
//require mongoose to connect to our MongoDB database
const mongoose = require("mongoose");

const medicineRoutes = require("./routes/medicineRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const labCountRoutes = require("./routes/labCountRoutes.js");
const userRoutes = require("./routes/userRoutes");
const reportsStoreRoutes = require("./routes/reportsStoreRoutes");
const streakRoutes = require("./routes/streaksRoutes");
const logRoutes = require("./routes/logRoute");
const morgan = require("morgan");
const healthDataRoutes = require('./routes/healthDataRoutes');


// Add this code below the MongoDB connection setup

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/labCounts", labCountRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reportsStore", reportsStoreRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/logs", logRoutes);
app.use('/api/healthdata',healthDataRoutes)
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//http://localhost:4000/api/user/register
