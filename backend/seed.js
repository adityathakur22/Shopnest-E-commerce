const path = require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
  {
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Comfortable over-ear headphones with active noise cancellation and long battery life.',
    price: 4999,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop',
    ratings: 4.6,
    numReviews: 38
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track workouts, heart rate, sleep, steps, and notifications from your phone.',
    price: 3499,
    category: 'Wearables',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop',
    ratings: 4.3,
    numReviews: 27
  },
  {
    name: 'Cotton Casual T-Shirt',
    description: 'Soft breathable cotton t-shirt for everyday wear.',
    price: 699,
    category: 'Fashion',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&auto=format&fit=crop',
    ratings: 4.1,
    numReviews: 19
  },
  {
    name: 'Minimal Desk Lamp',
    description: 'Adjustable LED desk lamp with three brightness levels for studying and working.',
    price: 1299,
    category: 'Home',
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&auto=format&fit=crop',
    ratings: 4.5,
    numReviews: 14
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of two premium ceramic mugs with a clean matte finish.',
    price: 899,
    category: 'Kitchen',
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&auto=format&fit=crop',
    ratings: 4.7,
    numReviews: 22
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned soles and breathable mesh.',
    price: 2799,
    category: 'Footwear',
    stock: 36,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop',
    ratings: 4.4,
    numReviews: 31
  }
];

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@shopnest.com',
        password: hashedPassword,
        role: 'admin',
        verified: true
      },
      {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true
      },
      {
        name: 'Priya Verma',
        email: 'priya@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true
      }
    ]);

    const createdProducts = await Product.insertMany(products);

    const orders = [
      {
        userId: createdUsers[1]._id,
        items: [
          {
            productId: createdProducts[0]._id,
            qty: 1,
            price: createdProducts[0].price
          },
          {
            productId: createdProducts[4]._id,
            qty: 2,
            price: createdProducts[4].price
          }
        ],
        totalAmount: createdProducts[0].price + createdProducts[4].price * 2,
        address: {
          fullName: 'Rahul Sharma',
          street: '42 MG Road',
          city: 'Bengaluru',
          postalCode: '560001',
          country: 'India'
        },
        paymentId: 'pay_seed_rahul_001',
        status: 'Delivered'
      },
      {
        userId: createdUsers[2]._id,
        items: [
          {
            productId: createdProducts[1]._id,
            qty: 1,
            price: createdProducts[1].price
          },
          {
            productId: createdProducts[2]._id,
            qty: 3,
            price: createdProducts[2].price
          }
        ],
        totalAmount: createdProducts[1].price + createdProducts[2].price * 3,
        address: {
          fullName: 'Priya Verma',
          street: '18 Park Street',
          city: 'Kolkata',
          postalCode: '700016',
          country: 'India'
        },
        paymentId: 'pay_seed_priya_001',
        status: 'Shipped'
      },
      {
        userId: createdUsers[1]._id,
        items: [
          {
            productId: createdProducts[5]._id,
            qty: 1,
            price: createdProducts[5].price
          }
        ],
        totalAmount: createdProducts[5].price,
        address: {
          fullName: 'Rahul Sharma',
          street: '42 MG Road',
          city: 'Bengaluru',
          postalCode: '560001',
          country: 'India'
        },
        paymentId: 'pay_seed_rahul_002',
        status: 'Pending'
      }
    ];

    await Order.insertMany(orders);

    console.log('Dummy data imported successfully');
    console.log(`Inserted ${createdUsers.length} users, ${createdProducts.length} products, and ${orders.length} orders`);
    console.log('Login with admin@shopnest.com / password123');
    console.log('Login with rahul@example.com / password123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

importData();
