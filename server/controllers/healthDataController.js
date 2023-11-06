const HealthData = require("../models/healthdata");
const mongoose = require("mongoose");

const addHealthData = async (req, res) => {
  try {
    const user_id = req.params.id
    console.log(user_id)
    const { Blood_Sugar, B_P_Dia, B_P_Sys } = req.body;
    const newData = new HealthData({ Blood_Sugar, B_P_Dia, B_P_Sys,user_id });
    await newData.save();
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllHealthData = async (req, res) => {
  try {
    const user_id = req.params.id
    const healthData = await HealthData.find({user_id});
    res.status(200).json({ success: true, data: healthData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateHealthDataField = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const field = req.query.field;
    const { value } = req.body;

    console.log("user id", user_id);
    console.log("field", field);
    console.log("value", value);

    // Find the existing data for the given user_id
    const existingData = await HealthData.findOne({ user_id });

    console.log("data is", existingData);

    // Update the specific field with its new value
    if (existingData) {
      // Parse the value to a number before updating the field
      const numericValue = parseFloat(value);

      existingData[field] = numericValue;
      console.log("new value", existingData[field]);
      await existingData.save();
      console.log(existingData,field)
      res.status(200).json({ success: true, data: existingData });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = {
    addHealthData,getAllHealthData,updateHealthDataField
}