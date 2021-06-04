import admin from 'firebase-admin';

const config: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail:
    process.env.NODE_ENV === 'production' && process.env.FIREBASE_CLIENT_EMAIL
      ? process.env.FIREBASE_CLIENT_EMAIL.replace(/\\n/g, '\n')
      : process.env.FIREBASE_CLIENT_EMAIL,
};

const firebaseAdmin = admin.initializeApp(config);

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
