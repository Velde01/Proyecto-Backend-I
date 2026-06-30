const socket = io();

const productForm = document.getElementById('productForm');
const productsList = document.getElementById('productsList');

// Escuchar la lista de productos que envía el servidor
socket.on('updateProducts', (products) => {
    productsList.innerHTML = ''; // Limpiar la pantalla antes de redibujar
    
    products.forEach(prod => {
        const card = document.createElement('div');
        card.style.border = '1px solid #000';
        card.style.padding = '10px';
        card.style.width = '200px';

        card.innerHTML = `
            <h3>${prod.title}</h3>
            <p>${prod.description}</p>
            <p><strong>Precio:</strong> $${prod.price}</p>
            <p><strong>Código:</strong> ${prod.code}</p>
            <button onclick="removeProduct(${prod.id})">Eliminar</button>
        `;
        productsList.appendChild(card);
    });
});

// Capturar el formulario y emitir el evento para agregar el producto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: Number(document.getElementById('price').value),
        category: document.getElementById('category').value,
        stock: Number(document.getElementById('stock').value),
        status: true // Requerido por la validación de tu ProductManager
    };

    socket.emit('newProduct', newProduct);
    productForm.reset(); // Limpiar los campos del formulario
});

// Función global para que los botones de eliminar puedan comunicarse con el socket
window.removeProduct = (id) => {
    socket.emit('deleteProduct', id);
};

// Escuchar alertas si falla alguna validación del ProductManager (ej: código repetido)
socket.on('errorNotification', (message) => {
    alert(`Error: ${message}`);
});