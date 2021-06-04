import admin from 'firebase-admin';

let firebaseAdmin: admin.app.App;

try {
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
} catch {
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: JSON.parse(process.env.FIREBASE_CLIENT_EMAIL as string),
    }),
  });
}

export type DecodedIdToken = admin.auth.DecodedIdToken;

/**
 * Verifies an id token using the firebase admin sdk
 * @param token Id token to verify
 */
export const verifyToken = (token: string) => {
  return firebaseAdmin.auth().verifyIdToken(token);
};

/**
 * Initializes a user with the default role
 * @param {string} uid
 */
export const initializeUser = (uid: string) => {
  return firebaseAdmin.auth().setCustomUserClaims(uid, { role: 'user' });
};

export default firebaseAdmin;
