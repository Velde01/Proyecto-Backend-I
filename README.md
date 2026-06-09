# 🚀 Entrega N.º 1 – API con FileSystem
# 🎯 Objetivo General
Desarrollar un servidor que gestione productos y carritos utilizando archivos (products.json y carts.json) como sistema de persistencia.

## 📁 Estructura General
Servidor en Node.js con Express

Escucha en puerto 3000 u 8080

Dos grupos de rutas:

/api/products
/api/carts
Rutas implementadas con Express Routers

## 🛒 Endpoints de Productos (/api/products)
Método	Ruta	Función
GET	    /	    Obtener todos los productos
GET	    /:pid	Obtener producto por ID
POST	/	    Crear nuevo producto (ID se autogenera)
PUT	    /:pid	Actualizar campos del producto excepto el ID
DELETE	/:pid	Eliminar producto por ID

## 🧺 Endpoints de Carritos (/api/carts)
Método	Ruta	            Función
POST	/	                Crear nuevo carrito con ID único
GET	    /:cid	            Obtener todos los productos del carrito
POST	/:cid/product/:pid	Agregar producto al carrito (aumenta quantity si ya existe)

## 💾 Persistencia de Datos
Se utiliza el módulo FileSystem (fs)
Archivos: products.json y carts.json
Se implementa un ProductManager.js y un CartManager.js