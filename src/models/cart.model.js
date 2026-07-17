const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
});

// Esto hace que cada vez que busquemos un carrito, automáticamente traiga los datos completos del producto
cartSchema.pre('find', function() {
    this.populate('products.product');
});
cartSchema.pre('findOne', function() {
    this.populate('products.product');
});

const cartModel = mongoose.model('carts', cartSchema);
module.exports = cartModel;