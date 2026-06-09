const fs = require('fs/promises');
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../data/products.json');
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    } 

    async saveProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === Number(id));
    }

    async addProduct(productData) {
        const products = await this.getProducts();

        const requiredFields = [
            'title',
            'description',
            'code',
            'price',
            'status',
            'stock',
            'category'
        ];

        const missingField = requiredFields.find(field => productData[field] === undefined);

        if (missingField) {
            throw new Error(`Falta el campo obligatorio: ${missingField}`);
        }

        const codeExists = products.some(product => product.code === productData.code);

        if (codeExists) {
            throw new Error('Ya existe un producto con ese código');
        }

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: Number(productData.price),
            status: productData.status,
            stock: Number(productData.stock),
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };

        products.push(newProduct);
        await this.saveProducts(products);

        return newProduct;
    }

    async updateProduct(id, productData) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === Number(id));

        if (index === -1) {
            return null;
        }

        delete productData.id;

        products[index] = {
            ...products[index],
            ...productData,
            price: productData.price !== undefined ? Number(productData.price) : products[index].price,
            stock: productData.stock !== undefined ? Number(productData.stock) : products[index].stock
        };

        await this.saveProducts(products);

        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === Number(id));

        if (index === -1) {
            return null;
        }

        const deletedProduct = products.splice(index, 1)[0];
        await this.saveProducts(products);

        return deletedProduct;
    }
}

module.exports = ProductManager;