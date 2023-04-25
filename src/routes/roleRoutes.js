const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.get("/", roleController.getRoles);
router.post("/", roleController.postRoles);
router.get("/:id", roleController.getRole);
router.delete("/:id", roleController.deleteRole);




module.exports = router;


