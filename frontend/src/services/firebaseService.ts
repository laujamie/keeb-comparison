import firebase from 'firebase';
import { auth } from '../util/firebase';

type UserProfile = {
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  id: string;
};

export const getIdToken = async () => {
  const user = auth.currentUser;
  if (user) return user.getIdToken();
  return null;
};

export const getIdTokenResult = async () => {
  const user = auth.currentUser;
  if (user) return user.getIdTokenResult();
  return null;
};

export const getUserProfile = (): UserProfile | null => {
  const user = auth.currentUser;
  if (user) {
    return {
      email: user.email,
      emailVerified: user.emailVerified,
      id: user.uid,
      name: user.displayName,
    };
  }
  return null;
};

export const signOut = () => {
  return auth.signOut();
};

export const createActionCodeSettings = (
  pathname = '/login'
): firebase.auth.ActionCodeSettings => ({
  url: `${window.location.protocol}//${window.location.host}${pathname}`,
  handleCodeInApp: false,
});
