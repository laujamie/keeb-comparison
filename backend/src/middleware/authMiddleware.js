const { verifyToken } = require('../services/firebase-admin');

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header.authorization;
    if (!authHeader) {
      throw Error('Authorization header must be provided');
    }
    const [bearerText, token] = authHeader.split();
    if (bearerText.toLowerCase() !== 'bearer') {
      throw Error('Authorization header must be provided in Bearer format');
    }
    if (!token) {
      throw Error('A valid authorization token must be provided');
    }
    const decodedToken = await verifyToken(token);
    if (req.body.userId && req.body.userId !== decodedToken.sub) {
      throw Error('Invalid user id provided in request');
    }
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(401).json({
      error: e.message || new Error('Invalid request!'),
    });
  }
};

const isAuthorized = (validRoles, allowSameUser) => {
  return (req, res, next) => {
    const { user } = req;
    const { id } = req.params;

    if (!user)
      return res.status(401).json({
        error: 'User is not authenticated',
      });

    if (allowSameUser && user.sub === id) return next();
    if (!user.role || !validRoles.includes(user.role)) {
      return res.status(401).json({
        error: 'User is not authorized to perform this action',
      });
    }
    return next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
