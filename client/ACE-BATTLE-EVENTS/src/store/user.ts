import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | { name?: string }
    }),
    persist: true,
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
        }
    }
});
export const useUiStore = defineStore('ui', {
    state: () => ({
        isMobileMenuOpen: false
    }),
    actions: {
        openMenu() { this.isMobileMenuOpen = true; },
        closeMenu() { this.isMobileMenuOpen = false; }
    }
});