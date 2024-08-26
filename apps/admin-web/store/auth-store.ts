import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
};

type Roles = Record<string, any>;

type AuthStore = {
  user: User | null;
  roles: Roles;
  isAuthenticated: boolean;
  setAuth: (user: User, roles: Roles) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      roles: {},
      isAuthenticated: false,
      setAuth: (user, roles) => set({ user, roles, isAuthenticated: true }),
      clearAuth: () => set({ user: null, roles: {}, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        roles: state.roles,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
