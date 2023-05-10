const express = require("express");
const snmpController = require("../controllers/snmpController");

const router = express.Router();

router.post("/selected-infos", snmpController.getSelectedSnmpInfo);
router.post("/", snmpController.addSnmpInfo);

router.get("/infos", snmpController.getAllSnmpRegisters);

router.delete("/:id", snmpController.deleteSnmpRegister);

router.put("/:id", snmpController.updateSnmpRegister);

module.exports = router;
