const express = require("express");
const conectarDB = require("./src/config/database");
const mqttClient = require("./src/config/mqtt");
const telemetriaRoute = require("./src/routes/telemetriaRoute");
const authRoute = require("./src/routes/authRoute")
const cors = require("cors");

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());

// Rutas del la API
app.use("/api/telemetria", telemetriaRoute);
app.use("/api/telemetria", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    // console.log(`Servidor corriendo en http://172.29.120.3:${PORT}`);
    console.log(`Conexión establecida correctamente en: ${PORT}`);
    
});
