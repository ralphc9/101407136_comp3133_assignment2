require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { user };
      } catch (err) {
        console.error('Token verification error:', err.message);
      }
    }
  }
  
  return { user: null };
};

module.exports = authMiddleware;