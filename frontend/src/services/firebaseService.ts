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
