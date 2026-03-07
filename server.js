require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

const connectDB = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

app.get('/vendor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'vendor.html'));
});

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});