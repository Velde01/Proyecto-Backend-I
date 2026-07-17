const express = require('express');
const productModel = require('../models/product.model'); // Usamos el modelo de Mongoose

const router = express.Router();

// 1. GET /api/products (Con Paginación, Filtros y Ordenamiento)
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Filtro de búsqueda (por categoría o estado)
        const filter = {};
        if (query) {
            if (query.toLowerCase() === 'true') filter.status = true;
            else if (query.toLowerCase() === 'false') filter.status = false;
            else filter.category = query;
        }

        // Opciones de paginación
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true // Devuelve objetos JS puros (útil para Handlebars)
        };

        // Opciones de ordenamiento
        if (sort) {
            if (sort === 'asc') options.sort = { price: 1 };
            else if (sort === 'desc') options.sort = { price: -1 };
        }

        // Ejecutamos la paginación de Mongoose
        const result = await productModel.paginate(filter, options);

        // Construcción dinámica de links para prev y next
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
        const buildLink = (pageNumber) => {
            if (!pageNumber) return null;
            return `${baseUrl}?limit=${limit}&page=${pageNumber}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`;
        };

        // Formato de respuesta exigido por la consigna
        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: buildLink(result.prevPage),
            nextLink: buildLink(result.nextPage)
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 2. GET /api/products/:pid (Buscar por ID)
router.get('/:pid', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 3. POST /api/products (Crear nuevo producto)
router.post('/', async (req, res) => {
    try {
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// 4. PUT /api/products/:pid (Actualizar producto)
router.put('/:pid', async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 5. DELETE /api/products/:pid (Eliminar producto)
router.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.pid);
        if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;