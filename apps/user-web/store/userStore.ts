// stores/userStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  // 추가 필요한 사용자 정보...
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: User) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}));

export default useUserStore;
