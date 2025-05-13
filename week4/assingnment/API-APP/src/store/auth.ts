import { create } from "zustand";

interface AuthState {
  userId: string | null;
  nickname: string | null;
  setUserId: (userId: string) => void;
  setNickname: (nickname: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let storedId = null;
  try {
    const fromLocal = localStorage.getItem("userId");
    if (fromLocal && fromLocal !== "null") storedId = fromLocal;
  } catch {
    storedId = null;
  }

  return {
    userId: storedId,
    nickname: null,
    setUserId: (userId) => {
      localStorage.setItem("userId", userId);
      set({ userId });
    },
    setNickname: (nickname) => set({ nickname }),
    logout: () => {
      localStorage.removeItem("userId");
      set({ userId: null, nickname: null });
    },
  };
});
