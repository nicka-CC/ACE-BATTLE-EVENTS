import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isMobileMenuOpen: false
  }),
  actions: {
    openMenu() { this.isMobileMenuOpen = true; },
    closeMenu() { this.isMobileMenuOpen = false; }
  }
}); 