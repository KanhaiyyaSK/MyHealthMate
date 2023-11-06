const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const healthDataSchema = new Schema(
  {
    Blood_Sugar: {
      type: Number,
    },
    B_P_Dia: {
      type: Number,
    },
    B_P_Sys: {
      type: Number,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthData", healthDataSchema);
