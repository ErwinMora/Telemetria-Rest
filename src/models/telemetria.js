const mongoose = require("mongoose");

const TelemetriaSchema = new mongoose.Schema({
    temperatura: { type: Number, required: true },
    humedad: { type: Number, required: true },
    telemetria: {
        rssi: { type: Number, required: true },
        voltaje: { type: Number, required: true }
    },
    timestamp: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Telemetria", TelemetriaSchema);
