import User from '../models/User.js';
import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

const register = async(req, res) => {
    const {name, email, password, role} = req.body;
    try {
        console.log("Incoming data: ", req.body);
        let user = await User.findOne({email});
        console.log("Quering for user with email: ", email);
        console.log("Existing user found: ", user);

        if(user) return res.status(400).json({message: "User already exists"});

        user  = await User.create({name, email, password, role});
        const token = generateToken(user._id);
        res.status(201).json({user, token});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message: 'Incorrect password entered'});

        const token = generateToken(user._id);
        res.status(200).json({user, token});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export {register, login};