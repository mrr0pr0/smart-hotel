import { defineStore } from "pinia";
import type { User } from "~/types/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },

  getters: {
    userRole: (state) => state.user?.role,
    userName: (state) => state.user?.name,
    userEmail: (state) => state.user?.email,
  },
});
