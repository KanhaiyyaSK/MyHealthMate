const express = require('express')
const {
     getAllMedicines,
     createMedicine,
     deleteMedicine,
     getSingleMedicine,
     updateMedicine } = require('../controllers/medicineController');
const { model } = require('mongoose');

const router = express.Router()
// get All medicines
router.get("/",getAllMedicines);

// get single medicine
router.get("/:id",getSingleMedicine);

// post a medicine
router.post("/",createMedicine);

// delete a medicine
router.delete("/:id",deleteMedicine);

// update a medicine
router.patch("/:id",updateMedicine);

module.exports = router;
