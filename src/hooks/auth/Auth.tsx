import { signInUserResponse } from '@/types/global';

type userData = signInUserResponse;

/**
 * Authentication hooks
 * @returns - auth methods
 */
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
