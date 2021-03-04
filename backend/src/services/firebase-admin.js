const admin = require('../util/firebase-admin');

/** Verifies provided token using the Firebase admin
 *
 * @param {string} token The token to verify
 */
const verifyToken = async (token) => {
  return await admin.auth().verifyIdToken(token);
};

/**
 * Initializes a user with the default role
 * @param {string} uid
 */
const initializeUser = (uid) => {
  return admin.auth().setCustomUserClaims(uid, { role: 'user' });
};

module.exports = { verifyToken, initializeUser };
