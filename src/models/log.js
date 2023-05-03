const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    logintime: {
      type: String,
      required: false,
    },
    logouttime: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    activity: {
      type: Array,
      required: false,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
