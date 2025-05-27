import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decodedInfo);

            const user = await User.findById(decodedInfo.id).select('-password');

            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            req.user = user;
            return next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({message: 'Not authorized, token failed'});
        }
    }
    return res.status(401).json({message: 'Not authorized, no token found'});
};

export default protect;