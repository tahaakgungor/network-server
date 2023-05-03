const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);
router.post("/roles", authController.postRoles);


//DELETE
router.delete("/users/:id", authController.deleteUser);

//UPDATE
router.put("/users/:id", authController.updateUser);

//GET ONE USER
router.post("/user", authController.getUser);



//GET USER BY ID
router.get("/user/:id", authController.getUserById);
module.exports = router;
