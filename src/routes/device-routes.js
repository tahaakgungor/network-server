const express = require("express");
const router = express.Router();
const Device = require("../models/device");
const { getSelectedDevices,getAllDevices, getDevice, createDevice, updateDevice, deleteDevice} = require("../controllers/device-controller");

router.get("/selected/:id", getSelectedDevices);
// Get all devices
router.get("/",getAllDevices);

// Get one device
router.get("/:id", getDevice);

// Create one device
router.post("/", createDevice);

// Update one device
router.put("/:id",updateDevice);

// Delete one device
router.delete("/:id", deleteDevice );

// Connect devices
// router.post("/connect/:id",connectDevices);

// // // Send command
// router.post("/command", sendCommand);


module.exports = router;