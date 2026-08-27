const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const passport = require('passport'); // Importamos passport
const initializePassport = require('./config/passport.config'); // Importamos tu configuración

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router'); 
const sessionsRouter = require('./routes/sessions.router'); // Importamos el router de sesiones

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inicializamos Passport ANTES de las rutas
initializePassport();
app.use(passport.initialize());

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter); // Conectamos los endpoints de login/register
app.use('/', viewsRouter); 

module.exports = app;