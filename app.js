import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Test route
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.get('/', (req, res) => {
//     res.json({message: 'Welcome to SKillSwap API'});
// });

// module.exports = app;
export default app;

