const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  device_type: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Device", DeviceSchema);
