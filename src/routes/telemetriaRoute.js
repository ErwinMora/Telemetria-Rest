const express = require("express");
const router = express.Router();
const telemetriaController = require("../controller/telemetriac");

// Recibe y guarda los datos del ESP32
router.post("/guardar-telemetria", telemetriaController.guardarDatos);

// Obtener todos los datos almacenados
router.get("/listar-telemetria", telemetriaController.obtenerDatos);

module.exports = router;
