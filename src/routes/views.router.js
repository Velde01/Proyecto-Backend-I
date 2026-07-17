const express = require('express');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');

const router = express.Router();

// 1. GET /products (Listado de productos con paginación para el usuario)
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Filtro por categoría o disponibilidad
        const filter = {};
        if (query) {
            if (query.toLowerCase() === 'true') filter.status = true;
            else if (query.toLowerCase() === 'false') filter.status = false;
            else filter.category = query;
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true // Fundamental para que Handlebars pueda leer los objetos de Mongoose sin errores
        };

        if (sort) {
            if (sort === 'asc') options.sort = { price: 1 };
            else if (sort === 'desc') options.sort = { price: -1 };
        }

        const result = await productModel.paginate(filter, options);

        // Armamos los links para los botones de Anterior y Siguiente
        const baseUrl = '/products';
        const prevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
        const nextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

        res.render('products', {
            products: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            totalPages: result.totalPages,
            prevLink,
            nextLink
        });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

// 2. GET /products/:pid (Detalle de un producto específico)
router.get('/products/:pid', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).lean();
        if (!product) return res.status(404).render('error', { error: 'Producto no encontrado' });
        
        res.render('productDetail', { product });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

// 3. GET /carts/:cid (Ver el contenido completo de un carrito específico)
router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).lean();
        if (!cart) return res.status(404).render('error', { error: 'Carrito no encontrado' });

        res.render('cart', { cart });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

// 4. GET / (Redirigimos al listado de productos)
router.get('/', (req, res) => {
    res.redirect('/products');
});

// 5. GET /realtimeproducts (Mantenemos la vista en tiempo real con WebSockets)
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

module.exports = router;