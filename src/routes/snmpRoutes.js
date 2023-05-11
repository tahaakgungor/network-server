const express = require("express");
const snmpController = require("../controllers/snmpController");

const router = express.Router();


router.delete("/:id", snmpController.deleteSnmpInfo);

router.post("/selected-infos", snmpController.getSelectedSnmpInfo);
router.post("/", snmpController.addSnmpInfo);

router.get("/infos", snmpController.getAllSnmpRegisters);

router.delete("/register/:id", snmpController.deleteSnmpReg);

router.put("/:id", snmpController.updateSnmpRegister);

router.post("/all", snmpController.getAllSnmpInfos);


module.exports = router;
