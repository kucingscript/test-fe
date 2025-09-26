import type { UserCredentials } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreState {
  isAuthenticated: boolean;
  user: UserCredentials | null;
  token: string | null;
  login: (userData: UserCredentials) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData,
          token: userData.token,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
