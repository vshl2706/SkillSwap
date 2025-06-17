export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log('User role: ', req.user.role);
        console.log('Allowed roles:', roles);
        console.log('Does role match:', roles.includes(req.user?.role));
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Access denied: Insufficient permissions"});
        }
        next();
    };
};

export default authorizeRoles;