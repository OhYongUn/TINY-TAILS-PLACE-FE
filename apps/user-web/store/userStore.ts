import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@app/interface/user/user';
import {
  fetchUserData,
  refreshTokens,
  verifyToken,
} from '@app/hook/auth/authService';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setUser: (user: User) => void;
  updateUser: (userData: Partial<User>) => void;
  clearUser: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  initializeAuth: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: true,
      error: null,
      setUser: (user: User) =>
        set({ user, isLoggedIn: true, isLoading: false }),
      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      clearUser: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, isLoggedIn: false, isLoading: false, error: null });
      },
      getAccessToken: () => localStorage.getItem('accessToken'),
      getRefreshToken: () => localStorage.getItem('refreshToken'),
      setTokens: (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ isLoggedIn: true, isLoading: false });
      },
      initializeAuth: async () => {
        set({ isLoading: true, error: null });
        const accessToken = get().getAccessToken();
        const refreshToken = get().getRefreshToken();
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        if (accessToken) {
          try {
            const isValid = await verifyToken(accessToken);
            console.log('isValid', isValid);
            if (isValid) {
              return;
            }
            if (refreshToken) {
              const newTokens = await refreshTokens(refreshToken);
              if (newTokens) {
                get().setTokens(newTokens.accessToken, newTokens.refreshToken);
                return;
              }
            }

            throw new Error('No valid tokens available');
          } catch (error) {
            console.error('Authentication error:', error);
            get().clearUser();
          }
        } else {
          get().clearUser();
        }
        set({ isLoading: false });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);

export default useUserStore;
