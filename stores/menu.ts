import { defineStore } from "pinia";
import type { MenuItem } from "~/types/order";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuItems: [] as MenuItem[],
    selectedCategory: null as string | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    setMenuItems(items: MenuItem[]) {
      this.menuItems = items;
    },

    setSelectedCategory(category: string | null) {
      this.selectedCategory = category;
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },
  },

  getters: {
    availableItems: (state) => state.menuItems.filter((item) => item.available),
    itemsByCategory: (state) => (category: string) =>
      state.menuItems.filter((item) => item.category === category),
    categories: (state) => [
      ...new Set(state.menuItems.map((item) => item.category)),
    ],
  },
});
