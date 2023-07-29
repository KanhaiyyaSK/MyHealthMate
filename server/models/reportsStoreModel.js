// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reportStoreSchema = new Schema(
// 	{
// 		reportName: {
// 			type: String,
// 			required: true,
// 		},
// 		reportResourceURL: {
// 			type: String,
// 			required: true,
// 		},
// 		user_id: {
// 			type: String,
// 			required: true,
// 		},
// 	},
// 	{ timestamps: true }
// );

// module.exports = mongoose.model("ReportStore", reportStoreSchema);
// models/Report.js

const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportName: {
      type: String,
      required: true,
    },
    reportResourceURL: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

