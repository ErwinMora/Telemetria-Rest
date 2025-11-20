const mqtt = require("mqtt");
const dotenv = require("dotenv");

dotenv.config();

const mqttOptions = {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    rejectUnauthorized: false,
};

console.log("Conectando a MQTT...");

const client = mqtt.connect(process.env.MQTT_URI, mqttOptions);

// Eventos conectar a el MQTT
client.on("connect", () => {
    console.log("Conectado al broker MQTT (TLS)");

    client.subscribe("esp32/telemetria", (err) => {
        if (err) console.error("Error al suscribirse al topic:", err);
    });
});

client.on("error", (err) => {
    console.error("Error en MQTT:", err.message);
});

client.on("reconnect", () => {
    console.log("Intentando reconectar a MQTT...");
});

// Publicar en MQTT
client.on("message", (topic, message) => {
    console.log(`Mensaje recibido en ${topic}:`, message.toString());

    try {
        const data = JSON.parse(message.toString());
        console.log("Datos procesados:", data);
    } catch (err) {
        console.error("Error procesando mensaje MQTT:", err);
    }
});

module.exports = client;
