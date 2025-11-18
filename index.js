const express = require("express");
const conectarDB = require("./src/config/database");
const telemetriaRoute = require("./src/routes/telemetriaRoute");
const cors = require("cors");

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());

// Rutas del la API
app.use("/api/telemetria", telemetriaRoute);

const PORT = process.env.PORT || 3000;;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://172.29.120.3:${PORT}`);
});
