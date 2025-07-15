require('dotenv').config();
const { verifyToken } = require('@clerk/backend');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const { sessionId, userId, orgId } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.user = { sessionId, userId, orgId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = { authenticateUser };
