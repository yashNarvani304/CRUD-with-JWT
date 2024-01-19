const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({

    title: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, min: [0, 'wrong min price'], max: [10000, `wrong max price`], required: false },
    discountPrice: { type: Number, min: [0, "wrong min discount amount"], max: [99, 'wrong min discount amount'], required: false },
    rating: { type: Number, min: [0, "wrong min rating"], max: [5, 'wrong min rating'], required: false },
    stock: { type: Number, min: [0, "wrong min stock"], required: false, default: 0 },
    brand: { type: String, required: false },
    category: { type: String, required: false },
    images: { type: [String], required: false },
    deleted: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }
})

const product = mongoose.model('Product', productSchema);
module.exports = product