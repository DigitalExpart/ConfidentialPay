const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const business = require('./routes/businessRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api', business);

app.get('/', (req, res) => {
  res.send('ConfidentialPay backend is running! 🚀');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.resolve(), 'dist', 'index.html'));
  });
}

module.exports = app;