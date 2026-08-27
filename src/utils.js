const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar nuestros tokens (¡en un proyecto real esto va en un archivo .env!)
const PRIVATE_KEY = "CoderSecretKey-Backend2"; 

// 1. Función para encriptar la contraseña (cumple con el criterio de bcrypt.hashSync)
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// 2. Función para comparar la contraseña al hacer login
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

// 3. Función para generar el token JWT
const generateToken = (user) => {
    // Firmamos el token con los datos del usuario y le damos 24 horas de validez
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
};

module.exports = {
    createHash,
    isValidPassword,
    generateToken,
    PRIVATE_KEY
};