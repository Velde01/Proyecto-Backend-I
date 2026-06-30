const express = require('express');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const productManager = new ProductManager();

// Cuando entren a http://localhost:8080/
router.get('/', async (req, res) => {
    const products = await productManager.getProducts(); // Reutiliza tu método
    // Renderiza 'home.handlebars' y le pasa la lista de productos
    res.render('home', { products, title: 'Home Estático' });
});

// Cuando entren a http://localhost:8080/realtimeproducts
router.get('/realtimeproducts', (req, res) => {
    // Renderiza 'realTimeProducts.handlebars'. La lista se cargará por WebSocket, no por aquí.
    res.render('realTimeProducts', { title: 'Tiempo Real' });
});

module.exports = router;