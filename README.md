# ESP32 BackEnd Telemetría - Node js

Este proyecto establece un sistema completo de adquisición de datos usando un **ESP32 con sensor DHT22**, que envía información de **temperatura** y **humedad** hacia un **servidor en Node.js**.  
Los datos se almacenan en **MongoDB**, cumpliendo los requisitos de telemetría solicitados.

---

## Node Version
- 20.19.5

## Características

- Lectura real de datos usando **DHT22** (temperatura y humedad).
- Envío de datos en formato **JSON** mediante HTTP POST.
- Backend en **Node.js + Express**.
- Almacenamiento en **MongoDB** con Mongoose.
- API con:
  - `POST /api/telemetria/guardar-telemetria` → Guarda lectura
  - `GET /api/telemetria/listar-telemetria` → Regresa todos los registros
  - `GET /api/telemetria/ultima-lectura` → Última lectura
- ESP32 envía datos cada **3 minutos**.

---

## Estructura del Backend
```
├── src
│   ├── config
│   │   └── database.js
│   ├── controller
│   │   └── telemetriac.js
│   ├── models
│   │   └── telemetria.js
│   └── routes
│       └── telemetriaRoute.js
├── .gitignore
├── README.md
├── index.js
├── package-lock.json
└── package.json
```
