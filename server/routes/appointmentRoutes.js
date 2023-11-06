const express = require("express");
const {
getAllAppointments,
  createAppointment,
  deleteAppointment,
  getSingleAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");
const router = express.Router();
// get All Appointments
router.get("/", getAllAppointments);

// get single Appointment
router.get("/:id", getSingleAppointment);

// post a Appointment
router.post("/", createAppointment);

// delete a Appointment
router.delete("/:id", deleteAppointment);

// update a Appointment
router.patch("/:id", updateAppointment);

module.exports = router;
