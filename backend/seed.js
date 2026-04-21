const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/productsDB')
  .then(async () => {
    console.log('Connected. Seeding...');

    await Product.deleteMany({});  // clears old data first

    await Product.insertMany([
      { title: "iPhone 15", price: 999, brand: "Apple", category: "Phones", stock: 50, description: "Latest iPhone", images: ["https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015/1.webp"] },
      { title: "Samsung Galaxy S24", price: 849, brand: "Samsung", category: "Phones", stock: 30, description: "Flagship Android", images: ["https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/1.webp"] },
      { title: "MacBook Pro", price: 1999, brand: "Apple", category: "Laptops", stock: 20, description: "M3 chip laptop", images: ["https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.webp"] },
      { title: "Sony Headphones", price: 299, brand: "Sony", category: "Audio", stock: 80, description: "Noise cancelling", images: ["https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.webp"] },
      { title: "Nike Air Max", price: 120, brand: "Nike", category: "Shoes", stock: 100, description: "Classic sneakers", images: ["https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.webp"] },
      { title: "Adidas Hoodie", price: 65, brand: "Adidas", category: "Clothing", stock: 60, description: "Comfortable hoodie", images: ["https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20Pinstripe%20Dress%20Shirt/1.webp"] },
      { title: "Coffee Maker", price: 49, brand: "Nespresso", category: "Kitchen", stock: 25, description: "Espresso machine", images: ["https://cdn.dummyjson.com/products/images/kitchen-accessories/Citrus%20Juicer/1.webp"] },
      { title: "Gaming Mouse", price: 79, brand: "Logitech", category: "Gaming", stock: 45, description: "RGB gaming mouse", images: ["https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Charger/1.webp"] },
      { title: "4K Monitor", price: 450, brand: "LG", category: "Monitors", stock: 15, description: "27 inch 4K display", images: ["https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/1.webp"] },
      { title: "Wireless Charger", price: 35, brand: "Anker", category: "Accessories", stock: 200, description: "Fast wireless charging", images: ["https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Charger/1.webp"] },
    ]);

    console.log('✅ 10 products added!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));