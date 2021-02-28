const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

/** Verifies provided token using the Firebase admin
 *
 * @param {string} token The token to verify
 */
const verifyToken = async (token) => {
  return await admin.auth().verifyIdToken(token);
};

exports.verifyToken = verifyToken;
