# Proyecto E-commerce - Backend II (Entrega 1)

Este repositorio contiene la primera entrega del curso de **Programación Backend II: Desarrollo Avanzado de Backend** en Coderhouse.

## Objetivos de la Entrega
El objetivo principal de esta etapa es implementar un sistema robusto de gestión de usuarios, integrando **Autenticación y Autorización** a través de JSON Web Tokens (JWT), encriptación de contraseñas y validación mediante estrategias de Passport.

## Tecnologías Utilizadas
* **Node.js & Express:** Servidor web y ruteo.
* **MongoDB & Mongoose:** Base de datos NoSQL y modelado (Modelo de Usuario).
* **Bcrypt:** Encriptación y validación de contraseñas de forma segura (`bcrypt.hashSync`).
* **JSON Web Token (JWT):** Generación de tokens de sesión para el sistema de login.
* **Passport & Passport-JWT:** Middleware para interceptar, validar tokens y proteger rutas.

## Endpoints de Autenticación (`/api/sessions`)

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/register` | Crea un nuevo usuario validando que el email sea único y encriptando su contraseña. |
| `POST` | `/login` | Valida las credenciales del usuario y devuelve un token JWT válido por 24 horas. |
| `GET` | `/current` | Ruta protegida mediante la estrategia "current" de Passport. Extrae, valida el token (Bearer Token) y devuelve los datos del usuario logueado. |

## Instalación y Ejecución

1. **Clonar el repositorio:**
    git clone https://github.com/Velde01/Proyecto-Backend-II.git

2. **Instalar las dependencias:** Descarga las librerías necesarias ejecutando el siguiente comando (la carpeta `node_modules` está ignorada por defecto).
    npm install

3. **Ejecutar el servidor:** Inicia la aplicación utilizando el script de Node.js[cite: 8].
    npm start

4. **Probar la API:** Una vez que la consola confirme que el servidor está corriendo[cite: 8], estará disponible de forma local en el puerto 8080.
   * `http://localhost:8080/api/sessions`

---
**Autor:** Mateo Bentos 
**Curso:** Programación Backend I - Coderhouse