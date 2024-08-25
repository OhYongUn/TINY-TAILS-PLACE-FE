import create from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setAdmin: (user: User) => void;
  clearAdmin: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAdmin: (user) => set({ user, isAuthenticated: true }),
      clearAdmin: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
