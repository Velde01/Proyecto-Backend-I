const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Para que no haya cuentas duplicadas
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts' // Vincula al usuario con su carrito
    },
    role: {
        type: String,
        default: 'user' // Por defecto, todos nacen como 'user'
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;