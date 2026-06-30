# 🚀 Proyecto Backend I - Coderhouse

Este repositorio contiene el desarrollo del proyecto final para el curso de **Programación Backend I: Desarrollo avanzado de Backend**. 

## 🎯 Objetivo General
Desarrollar un servidor en Node.js con Express que gestione productos y carritos de compras utilizando archivos JSON como sistema de persistencia (`products.json` y `carts.json`). Además, el proyecto cuenta con un sistema visual utilizando el motor de plantillas **Handlebars** y actualización en tiempo real mediante **WebSockets** (Socket.IO).

## ⚙️ Tecnologías Utilizadas
* **Node.js** & **Express** (Servidor y ruteo)
* **FileSystem (`fs`)** (Persistencia de datos)
* **Express-Handlebars** (Motor de plantillas)
* **Socket.IO** (Comunicación bidireccional en tiempo real)

---

## 🖼️ Vistas (Frontend)
El proyecto incluye una interfaz gráfica para visualizar e interactuar con los datos de la API.

| Ruta | Descripción |
| :--- | :--- |
| `/` | **Home:** Muestra la lista estática de productos. Se actualiza únicamente al recargar la página. |
| `/realtimeproducts` | **Tiempo Real:** Muestra la lista de productos y un formulario para agregar/eliminar. Todo cambio se refleja instantáneamente en todos los clientes conectados mediante WebSockets. |

---

## 🛒 API Endpoints - Productos (`/api/products`)
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Devuelve la lista completa de productos. |
| **GET** | `/api/products/:pid` | Devuelve un producto específico según su ID. |
| **POST** | `/api/products` | Crea un nuevo producto. |
| **PUT** | `/api/products/:pid` | Actualiza los campos de un producto existente por su ID. |
| **DELETE** | `/api/products/:pid` | Elimina un producto por su ID. |

## 🧺 API Endpoints - Carritos (`/api/carts`)
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/carts` | Crea un carrito nuevo vacío. |
| **GET** | `/api/carts/:cid` | Devuelve los productos de un carrito específico según su ID. |
| **POST** | `/api/carts/:cid/product/:pid` | Agrega un producto (`pid`) a un carrito (`cid`). |

---

## 💾 Persistencia de Datos
La lógica de negocio se maneja a través de dos clases principales:
* `ProductManager.js`
* `CartManager.js`

La información se guarda y se lee de manera asíncrona utilizando el módulo nativo `fs/promises` en los archivos ubicados en la carpeta `src/data/`.

---

## 🚀 Instalación y Ejecución

Para poner en marcha este proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:** Descarga el código fuente en tu máquina local.
   `git clone https://github.com/Velde01/Proyecto-Backend-I.git`
   `cd Proyecto-Backend-I`

2. **Instalar dependencias:** Descarga las librerías necesarias (Express, Socket.io, Handlebars, etc.) definidas en el archivo package.json ejecutando el comando:
   `npm install`

3. **Ejecutar el servidor:** Inicia la aplicación utilizando el script definido en tu package.json. Esto levantará el servidor en el puerto 8080:
   `npm start`

4. **Acceder a la aplicación:** Una vez que la consola confirme que el servidor está corriendo, abre tu navegador y dirígete a:
   - Vista Estática: http://localhost:8080/
   - Vista en Tiempo Real: http://localhost:8080/realtimeproducts