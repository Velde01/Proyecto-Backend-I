const app = require('./src/app'); // Importamos la configuración de Express
const { Server } = require('socket.io');
const ProductManager = require('./src/managers/ProductManager');

const PORT = 8080;
const productManager = new ProductManager();

// Levantamos el servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Inicializamos WebSockets (Socket.IO)
const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado:', socket.id);

    // Enviar productos al conectarse
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    // Recibir nuevo producto
    socket.on('newProduct', async (productData) => {
        try {
            await productManager.addProduct(productData); 
            const updatedProducts = await productManager.getProducts();
            io.emit('updateProducts', updatedProducts); 
        } catch (error) {
            socket.emit('errorNotification', error.message);
        }
    });

    // Eliminar producto
    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });
});