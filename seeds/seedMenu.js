require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const MenuItem = require('../models/MenuItem');

const seedItems = [
  {
    title: 'Chicken Rice',
    description: 'Steamed chicken served with fragrant rice and sauce.',
    category: 'Rice',
    price: 8.5,
    imageUrl: '/images/chicken-rice.jpg'
  },
  {
    title: 'Fried Rice',
    description: 'Classic fried rice with egg and vegetables.',
    category: 'Rice',
    price: 7.5,
    imageUrl: '/images/fried-rice.jpg'
  },
  {
    title: 'Mee Goreng',
    description: 'Spicy fried noodles with vegetables and egg.',
    category: 'Noodles',
    price: 7.0,
    imageUrl: '/images/mee-goreng.jpg'
  },
  {
    title: 'Tom Yum Noodles',
    description: 'Tangy and spicy noodles with rich broth.',
    category: 'Noodles',
    price: 9.0,
    imageUrl: '/images/tom-yum-noodles.jpg'
  },
  {
    title: 'Iced Lemon Tea',
    description: 'Refreshing iced lemon tea.',
    category: 'Drinks',
    price: 3.5,
    imageUrl: '/images/iced-lemon-tea.jpg'
  },
  {
    title: 'Mineral Water',
    description: 'Chilled bottled drinking water.',
    category: 'Drinks',
    price: 2.0,
    imageUrl: '/images/mineral-water.jpg'
  },
  {
    title: 'Curry Puff',
    description: 'Crispy pastry filled with curried potato.',
    category: 'Snacks',
    price: 2.5,
    imageUrl: '/images/curry-puff.jpg'
  },
  {
    title: 'Sausage Bun',
    description: 'Soft bun with chicken sausage inside.',
    category: 'Snacks',
    price: 3.0,
    imageUrl: '/images/sausage-bun.jpg'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();
    await MenuItem.insertMany(seedItems);

    console.log('Menu items seeded successfully');

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();