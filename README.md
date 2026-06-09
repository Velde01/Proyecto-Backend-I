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
Método	Ruta	
GET     /api/products
GET     /api/products/:pid
POST    /api/products
PUT     /api/products/:pid
DELETE  /api/products/:pid

## 🧺 Endpoints de Carritos (/api/carts)
Método	Ruta	      
POST    /api/carts
GET     /api/carts/:cid
POST    /api/carts/:cid/product/:pid

## 💾 Persistencia de Datos
Se utiliza el módulo FileSystem (fs)
Archivos: products.json y carts.json
Se implementa un ProductManager.js y un CartManager.js