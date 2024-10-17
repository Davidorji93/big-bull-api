const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET); // Verify the token
    req.user_id = decodedToken.id; // Assuming 'id' is the user ID in the token payload
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
