require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { user: decoded };
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }

  return {};
};

console.log('JWT_SECRET:', process.env.JWT_SECRET);

module.exports = authMiddleware;
