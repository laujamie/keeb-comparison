import { atom } from 'recoil';

type UserState = {
  isLoaded: boolean;
  isAuthenticated: boolean;
};

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    isLoaded: false,
    isAuthenticated: false,
  },
});
