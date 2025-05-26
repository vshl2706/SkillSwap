const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to SKillSwap API'});
});

module.exports = app;

