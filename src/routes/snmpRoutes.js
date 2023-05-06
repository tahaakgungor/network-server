const express = require("express");
const snmpController = require("../controllers/snmpController");

const router = express.Router();

router.get("/", snmpController.getAllSnmpInfo);
router.post("/", snmpController.addSnmpInfo);

module.exports = router;
