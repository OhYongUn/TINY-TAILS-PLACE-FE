// stores/userStore.ts
import { create } from 'zustand';
import {User} from "@app/interface/user/user";
import {createJSONStorage, persist} from 'zustand/middleware';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user: User) => set({ user, isLoggedIn: true }),
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
      getAccessToken: () => localStorage.getItem('accessToken'),
      getRefreshToken: () => localStorage.getItem('refreshToken'),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    }
  )
);

export default useUserStore;
