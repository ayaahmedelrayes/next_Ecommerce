const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  brand: { type: String, default: "" },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
},{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);