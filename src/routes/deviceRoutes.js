const express = require("express");
const router = express.Router();

const deviceController= require("../controllers/deviceController");

router.get("/selected/:id", deviceController.getSelectedDevices);
// Get all devices
router.get("/",deviceController.getAllDevices);

// Get one device
router.get("/:id", deviceController.getDevice);

// Create one device
router.post("/", deviceController.createDevice);

// Update one device
router.put("/:id",deviceController.updateDevice);

// Delete one device
router.delete("/:id", deviceController.deleteDevice );


module.exports = router;

// Connect devices
// router.post("/connect/:id",connectDevices);

// // // Send command
// router.post("/command", sendCommand);