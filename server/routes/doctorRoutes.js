const express = require("express");
const {
  getAllDoctors,
  getSingleDoctor,
  createDoctor,
  deleteDoctor,
  updateDoctor,
  getNearbyDoctors,
} = require("../controllers/doctorController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
// router.use(requireAuth);

// GET all doctors done
router.get("/", getAllDoctors);

// GET nearby doctors done
router.post("/nearby", getNearbyDoctors);

// GET a single doctor done
router.get("/:id", getSingleDoctor);

// POST a new doctor done
router.post("/", createDoctor);

// DELETE a doctor done
router.delete("/:id", deleteDoctor);

// UPDATE a doctor done
router.patch("/:id", updateDoctor);

module.exports = router;
