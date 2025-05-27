import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getProfile = async(req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({message: "Failed to load profile"});
    }
};

export const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if(!user) return res.status(404).json({message: "User not found"});

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
    }

    console.log('Updating user with: ', req.body);
    const updatedUser = await user.save();
    console.log('Saved user:', updatedUser);

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        updatedAt: updatedUser.updatedAt,
    });
};

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: "Failed to fetch users", error: err.message});
    }
};
