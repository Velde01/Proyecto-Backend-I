const express = require('express');
const userModel = require('../models/user.model');
const { createHash, isValidPassword, generateToken } = require('../utils');
const passport = require('passport');

const router = express.Router();

// 1. Ruta de Registro
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;

        // Validar si el usuario ya existe por email
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ status: 'error', message: 'El usuario ya existe' });
        }

        // Crear el usuario con la contraseña encriptada usando bcrypt
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password), // Hasheamos la contraseña
            role: role || 'user'
        };

        await userModel.create(newUser);
        res.status(201).json({ status: 'success', message: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// 2. Ruta de Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
        }

        // Validar contraseña
        if (!isValidPassword(user, password)) {
            return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
        }

        // Generar el token JWT
        const token = generateToken(user);

        // Devolver el token al cliente
        res.json({ status: 'success', message: 'Login exitoso', token });

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// 3. Ruta Current (Validación de Token con Passport)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Si el token es válido, passport extrae los datos y los deja en req.user
    res.json({ 
        status: 'success', 
        message: 'Usuario autenticado',
        payload: req.user 
    });
});

module.exports = router;