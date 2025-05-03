import { create } from 'zustand';

interface RecentLoginState {
  recentLogin: Date | null;
  setRecentLogin: (recentLogin: Date) => void;
}

export const useRecentLogin = create<RecentLoginState>()((set) => ({
  recentLogin: null,
  setRecentLogin: (recentLogin) => set({ recentLogin }),
}));
