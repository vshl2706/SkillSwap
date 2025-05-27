import express from 'express';
const router = express.Router();
import {body} from 'express-validator';
import {register, login} from '../controllers/authController.js';

router.post('/register', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({min: 6}),
], register);

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty(),
], login);

export default router;