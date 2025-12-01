const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '12');

// Función para registrar un usuario nuevo
exports.registroUsuarios = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // Validar los campos que son obligatorios
        if (!email || !password || !username)
            return res.status(400).json({ message: 'Email, username y contraseña son requeridos' });
        // Verificar si ya existe email
        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(409).json({ message: 'El email ya está en uso' });
        // Hashear la contraseña
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        // Crear el nuevo usuario
        const user = new User({ email, password: hashed, username });
        await user.save();
        // Recibir la la respuesta sin la contraseña
        res.status(201).json({
            message: 'Usuario creado',
            user: {
                id: user._Id,
                email: user.email,
                username: user.username
            }
        });
        console.log("Se registro exitosamente el usuario.");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

// Funcion para autenticar los usuarios
exports.loginUsuarios = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email y contraseña son requeridos' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
        // Comparar la contraseña con el hash guardado
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Credenciales incorrectas' });

        // Generar JWT (firma con SECRET)xx
        const token = jwt.sign(
            { sub: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ message: 'Autenticado', token, user: { id: user._id, email: user.email } });
        console.log("Inicio de Sesión Exitoso");

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

