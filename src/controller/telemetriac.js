const Telemetria = require("../models/telemetria");

exports.guardarDatos = async (req, res) => {
    try {
        const datos = req.body;
        console.log("Datos recibidos del ESP32:", datos);
        const nuevo = await Telemetria.create(datos);
        res.status(201).json({ ok: true, mensaje: "Datos almacenados correctamente", data: nuevo });
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).json({ ok: false, mensaje: "Error en el servidor" });
    }
};

exports.obtenerDatos = async (req, res) => {
    try {
        const registros = await Telemetria.find().sort({ createdAt: -1 });
        res.json({ ok: true, total: registros.length, data: registros });
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).json({ ok: false, mensaje: "Error en el servidor" });
    }
};
