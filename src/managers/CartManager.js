const fs = require('fs/promises');
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../data/carts.json');
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async createCart() {
        const carts = await this.getCarts();

        const newCart = {
            id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };

        carts.push(newCart);
        await this.saveCarts(carts);

        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === Number(id));
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === Number(cartId));

        if (cartIndex === -1) {
            return null;
        }

        const productInCart = carts[cartIndex].products.find(
            product => product.product === Number(productId)
        );

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            carts[cartIndex].products.push({
                product: Number(productId),
                quantity: 1
            });
        }

        await this.saveCarts(carts);

        return carts[cartIndex];
    }
}

module.exports = CartManager;