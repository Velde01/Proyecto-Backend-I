# 🛒 Proyecto Backend I - E-Commerce (Entrega Final)

Este repositorio contiene la **Entrega Final** del curso de **Programación Backend I: Desarrollo Avanzado de Backend** en Coderhouse. 

El proyecto consiste en una API RESTful para gestionar el catálogo y carritos de un e-commerce, con vistas dinámicas renderizadas desde el servidor y persistencia de datos en la nube.

## 🚀 Tecnologías Utilizadas

- **Node.js** & **Express.js** (Servidor web y ruteo)
- **MongoDB Atlas** & **Mongoose** (Base de datos en la nube y ODM)
- **mongoose-paginate-v2** (Paginación avanzada de productos)
- **Handlebars** (Motor de plantillas para las vistas)
- **Socket.io** (Comunicación en tiempo real)

## 🎯 Requisitos Cumplidos en esta Entrega

1. **Migración a MongoDB:** Toda la persistencia de datos (antes en FileSystem) fue migrada a MongoDB Atlas usando Mongoose.
2. **Paginación, Filtros y Ordenamiento:** El endpoint de productos (`GET /api/products`) permite consultas avanzadas (`limit`, `page`, `sort`, `query`).
3. **Populate en Carritos:** Al consultar un carrito específico, los productos referenciados se traen completos mediante el método `.populate()`.
4. **Gestión Avanzada de Carritos:** Nuevos endpoints para vaciar el carrito, actualizar el array completo de productos, actualizar cantidades y eliminar productos específicos.
5. **Vistas Integradas:** - `/products`: Catálogo paginado con botones para ver detalles y agregar al carrito.
   - `/carts/:cid`: Vista detallada de un carrito con sus productos populados.

---

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Velde01/Proyecto-Backend-I.git](https://github.com/Velde01/Proyecto-Backend-I.git)
   cd Proyecto-Backend-I
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la Base de Datos:**
   Asegúrate de que en tu archivo principal la variable `MONGO_URI` tenga un string de conexión válido a tu cluster de MongoDB Atlas.

4. **Levantar el servidor:**
   ```bash
   npm start
   ```
   El servidor correrá en `http://localhost:8080`.

---

## 🌐 Endpoints de la API

### Productos (`/api/products`)
- `GET /` : Obtiene todos los productos con paginación, filtros y ordenamiento.
- `GET /:pid` : Obtiene un producto por su ID.
- `POST /` : Crea un nuevo producto.
- `PUT /:pid` : Actualiza un producto existente.
- `DELETE /:pid` : Elimina un producto.

### Carritos (`/api/carts`)
- `POST /` : Crea un nuevo carrito vacío.
- `GET /:cid` : Obtiene un carrito por ID con sus productos populados.
- `POST /:cid/product/:pid` : Agrega un producto al carrito (o incrementa su cantidad).
- `DELETE /:cid/products/:pid` : Elimina un producto específico del carrito.
- `PUT /:cid` : Actualiza el carrito entero con un nuevo array de productos.
- `PUT /:cid/products/:pid` : Actualiza únicamente la cantidad de un producto.
- `DELETE /:cid` : Vacía el carrito por completo.

---

## 🖥️ Vistas (Frontend)

Para probar la interfaz gráfica desde el navegador, ingresa a:
- **Catálogo:** [http://localhost:8080/products](http://localhost:8080/products)
- **Carrito de pruebas:** Para probar el carrito, debes crear uno previamente con un `POST` a `/api/carts` y usar ese ID en el frontend.

---
**Autor:** Mateo Bentos 
**Curso:** Programación Backend I - Coderhouse