import { signInUserResponse } from '@/pages/login';

type userData = signInUserResponse;

export const useAuth = () => {
  const logout = (): void => {
    localStorage.removeItem(`cs2-auth`);
  };

  const getCurrentUser = (): userData => {
    return JSON.parse(localStorage.getItem(`cs2-auth`));
  };

  const isAuthenticated = (): boolean => {
    return localStorage.getItem(`cs2-auth`) != null;
  };

  return { logout, getCurrentUser, isAuthenticated };
};
