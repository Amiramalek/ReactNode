const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is provided, allow the request to proceed without authentication
    if (!token) {
        // You can handle this case as needed, for example, proceed as a guest
        req.user = null;  // or create a default guest user object if needed
        return next();  // Proceed without authentication
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Set the user information (e.g., user._id) from the token
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
