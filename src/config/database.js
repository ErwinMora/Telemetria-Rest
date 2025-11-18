const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();

const conectarDB = async () => {
    try {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.log("Error al conectar a la base de datos.");
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;

