const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to mongoDB');
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB connection failed:', err.message);
    });