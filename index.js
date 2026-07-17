const app = require('./src/app'); 
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const productModel = require('./src/models/product.model');
const PORT = 8080;
const MONGO_URI = 'mongodb+srv://mtbentos_db_user:lileLhn7gltUi9ZJ@backend.sm1hlhv.mongodb.net/?appName=Backend';

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a la base de datos MongoDB Atlas'))
    .catch(error => console.error('Error en la conexión a MongoDB:', error));

// Levantamos el servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Inicializamos WebSockets (Socket.IO)
const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado:', socket.id);

    // Enviar productos al conectarse
    // Usamos .find().lean() para que devuelva un objeto puro de JavaScript (necesario para Handlebars/Sockets)
    const products = await productModel.find().lean();
    socket.emit('updateProducts', products);

    // Recibir nuevo producto
    socket.on('newProduct', async (productData) => {
        try {
            await productModel.create(productData); // Mongoose: crea el producto
            const updatedProducts = await productModel.find().lean();
            io.emit('updateProducts', updatedProducts); 
        } catch (error) {
            socket.emit('errorNotification', error.message);
        }
    });

    // Eliminar producto
    socket.on('deleteProduct', async (id) => {
        try {
            await productModel.findByIdAndDelete(id); // Mongoose: busca por ID y elimina
            const updatedProducts = await productModel.find().lean();
            io.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    });
});