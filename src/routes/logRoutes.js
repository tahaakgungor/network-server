const express = require("express");
const logController = require("../controllers/logController");

const router = express.Router();


router.put("/user/:id", logController.updateUserLog);

//GET LOGGED IN USER
router.get("/user/:id", logController.getUserLog);
router.get("/user/last/:id", logController.getUserLastLog);

//POST LOGGED IN USER
router.post("/user/:id", logController.postUserLog);


module.exports = router;
