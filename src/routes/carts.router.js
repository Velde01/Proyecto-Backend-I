const express = require('express');
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);

    if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart.products });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);

    if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);

    if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: updatedCart });
});

module.exports = router;