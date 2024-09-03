const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateUser = async(req, res) => {
    const token = req.header('Authorization')?.replace('Bearer', '');
    
    if(!token) {
        return res.status(401).json({ message: 'Access denied'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};