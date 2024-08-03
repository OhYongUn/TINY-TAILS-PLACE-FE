// stores/userStore.ts
import { create } from 'zustand';
import {user} from "@app/interface/user/user";

interface UserState {
  user: user | null;
  isLoggedIn: boolean;
  setUser: (user: user) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: user) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}));

export default useUserStore;
