const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Ruta para autenticar usuarios
router.post("/register-user", authController.registroUsuarios);
router.post("/login", authController.loginUsuarios);


module.exports = router;