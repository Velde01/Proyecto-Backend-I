const express = require('express');
const cartModel = require('../models/cart.model'); // Importamos el modelo de Mongoose de carritos

const router = express.Router();

// 1. POST /api/carts (Crear un carrito nuevo vacío)
router.post('/', async (req, res) => {
    try {
        const newCart = await cartModel.create({ products: [] });
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 2. GET /api/carts/:cid (Obtener un carrito por ID con POPULATE)
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        // Buscamos el carrito (el populate de los productos se hace automáticamente gracias al middleware pre-find que pusimos en el modelo)
        const cart = await cartModel.findById(cid);
        
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 3. POST /api/carts/:cid/product/:pid (Agregar un producto al carrito o incrementar su cantidad)
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        // Verificamos si el producto ya existe en el carrito
        // Usamos toString() para comparar los ObjectIds de Mongoose
        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid || p.product.toString() === pid);

        if (productIndex !== -1) {
            // Si ya existe, sumamos 1 a la cantidad
            cart.products[productIndex].quantity += 1;
        } else {
            // Si no existe, lo agregamos con cantidad 1
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json({ status: 'success', message: 'Producto agregado al carrito', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 4. DELETE /api/carts/:cid/products/:pid (Eliminar un producto específico del carrito)
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        // Filtramos para quitar el producto que queremos eliminar
        cart.products = cart.products.filter(p => p.product._id.toString() !== pid && p.product.toString() !== pid);

        await cart.save();
        res.json({ status: 'success', message: 'Producto eliminado del carrito correctamente', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 5. PUT /api/carts/:cid (Actualizar el carrito completo con un array de productos)
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body; // Se espera un array con la estructura: [{ product: "id", quantity: X }]

        if (!Array.isArray(products)) {
            return res.status(400).json({ status: 'error', message: 'Se requiere un array de productos' });
        }

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        );

        if (!updatedCart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        res.json({ status: 'success', message: 'Carrito actualizado correctamente', payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 6. PUT /api/carts/:cid/products/:pid (Actualizar únicamente la cantidad de un producto específico)
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!quantity || isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número mayor a 0' });
        }

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        // Buscamos el producto en el carrito
        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid || p.product.toString() === pid);

        if (productIndex === -1) {
            return res.status(404).json({ status: 'error', message: 'El producto no se encuentra en este carrito' });
        }

        // Actualizamos la cantidad
        cart.products[productIndex].quantity = parseInt(quantity);
        await cart.save();

        res.json({ status: 'success', message: 'Cantidad de producto actualizada', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 7. DELETE /api/carts/:cid (Vaciar el carrito por completo)
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        
        // Seteamos el array de productos vacío
        const clearedCart = await cartModel.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        );

        if (!clearedCart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        res.json({ status: 'success', message: 'Carrito vaciado correctamente', payload: clearedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;