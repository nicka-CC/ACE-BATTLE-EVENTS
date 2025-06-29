<script setup lang="ts">
// Компонент использует setup script с TypeScript
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button/Button.vue';
import { useUserStore } from '@/store/user';
import { useUiStore } from '@/store/ui';
const router = useRouter();
const userStore = useUserStore();
const uiStore = useUiStore();

const handleLogout = () => {
  userStore.logout();
  router.push({ name: 'login' });
  uiStore.closeMenu();
};
</script>

<template>
  <div class="layout">
    <!-- Desktop Header -->
    <nav class="navbar">
      <div class="logo">ACE BATTLE EVENTS</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link home-link">HOME</router-link>
        <router-link to="/calendar" class="nav-link">CALENDAR</router-link>
        <router-link to="/close-events" class="nav-link">CLOSE EVENTS</router-link>
      </div>
      <div class="auth-buttons">
        <a href="/add-coins" v-if="userStore.user" style="margin: auto 0; display:flex; gap:10px">
          <img src="@/components/icons/Coin.svg" alt="Coin" width="20px"  />
          {{ userStore.user.balance }} coins
        </a>
        <div v-else style="display: flex;gap:20px;">
          <Button type="icon" label="Sign in" style="width: 100px; color:white; font-weight: 300" @click=" router.push({ name: 'login' });"/>
          <Button type="icon" label="Sign up" style="width: 100px; color:white; font-weight: 300" @click=" router.push({ name: 'register' });"/>
        </div>
        <Button v-if="userStore.user" type="icon" label="Sign out" style="width: 100px; color:white; font-weight: 300" @click="handleLogout"/>
      </div>
    </nav>

    <!-- Mobile Header -->
    <nav class="navbar-mobile">
      <img src="@/components/icons/III.svg" alt="menu" width="28px" class="burger" @click="uiStore.openMenu()" />
      <div class="logo">ACE BATTLE EVENTS</div>
    </nav>

    <!-- Мобильное меню -->
    <transition name="mobile-menu-fade">
      <div v-if="uiStore.isMobileMenuOpen" class="mobile-menu-overlay" @click.self="uiStore.closeMenu()">
        <aside class="mobile-menu-panel">
          <div class="mobile-menu-header">
            <div class="logo">ACE BATTLE EVENTS</div>
            <button class="close-btn" @click="uiStore.closeMenu()">✕</button>
          </div>
          <template v-if="userStore.user">
            <div class="user-block">
              <div class="user-avatar">
                <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#fff"/><circle cx="20" cy="16" r="8" fill="#bdbdbd"/><rect x="8" y="28" width="24" height="8" rx="4" fill="#bdbdbd"/></svg>
              </div>
              <div class="user-info">
                <div class="user-role">{{userStore.user.permissions === 2 ? 'admin' : userStore.user.permissions === 1 ? 'manager' : 'blocked'}}</div>
                <div class="user-name">{{ userStore.user.name }} {{ userStore.user.surname }}</div>
                <div class="user-balance"><img src="@/components/icons/Coin.svg" alt="Coin" width="18"/> {{ userStore.user.balance }} bc</div>
              </div>
              <button class="logout-btn" @click="handleLogout">
                <svg width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          </template>
          <template v-else>
            <div class="mobile-auth-buttons">
              <Button type="icon" label="Sign in" style="width: 120px; color:white; font-weight: 300" @click="router.push({ name: 'login' }); uiStore.closeMenu()"/>
              <Button type="icon" label="Sign up" style="width: 120px; color:white; font-weight: 300" @click="router.push({ name: 'register' }); uiStore.closeMenu()"/>
            </div>
          </template>
          <nav class="mobile-nav-links">
            <router-link to="/" class="mobile-nav-link" @click="uiStore.closeMenu()">HOME</router-link>
            <router-link to="/calendar" class="mobile-nav-link" @click="uiStore.closeMenu()">CALENDAR</router-link>
            <router-link to="/close-events" class="mobile-nav-link" @click="uiStore.closeMenu()">CLOSE EVENTS</router-link>
            <router-link v-if="userStore.user" to="/register-team" class="mobile-nav-link" @click="uiStore.closeMenu()">REGISTER TEAM</router-link>
          </nav>
        </aside>
      </div>
    </transition>

    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">ACE BATTLE EVENTS</div>
        <div class="footer-copyright">© 2023 Ace Battle Association</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@media(max-width: 700px) {
  .navbar{ display:none !important; }
  .logo{ margin-left:auto; }
  .navbar-mobile{ display:flex !important; padding:28px 16px; background: #1E1C1F !important; align-items:center; }
}
.navbar-mobile{ display:none; }
@media(max-width: 700px) { .navbar-mobile{ display:flex !important; } }

.burger { cursor:pointer; margin-right:16px; }

.mobile-menu-overlay {
  position: fixed;
  z-index: 1000;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: flex-end;
}
.mobile-menu-panel {
  width: 90vw;
  max-width: 400px;
  height: 100vh;
  background: #18171A;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
  box-shadow: -2px 0 16px rgba(0,0,0,0.2);
  animation: slideIn 0.3s;
}
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px 12px 20px;
  border-bottom: 1px solid #a00;
}
.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
}
.user-block {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #a00;
}
.user-avatar { background: #fff; border-radius: 8px; }
.user-info { flex:1; }
.user-role { color: #888; font-size: 1rem; }
.user-name { font-size: 1.1rem; font-weight: 500; color: #fff; }
.user-balance { color: #ffe600; font-size: 1.1rem; display: flex; align-items: center; gap: 4px; }
.logout-btn {
  background: #a00;
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mobile-auth-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 24px 0 12px 0;
}
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 16px;
}
.mobile-nav-link {
  color: #fff;
  text-decoration: none;
  padding: 18px 24px;
  border-bottom: 1px solid #a00;
  font-size: 1.1rem;
  transition: background 0.2s, color 0.2s;
}
.mobile-nav-link:hover {
  background: #2a2a2a;
  color: #e74c3c;
}
.mobile-menu-fade-enter-active, .mobile-menu-fade-leave-active {
  transition: opacity 0.2s;
}
.mobile-menu-fade-enter-from, .mobile-menu-fade-leave-to {
  opacity: 0;
}
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #1a1a1a; /* Dark background as in image */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between; /* Space out items */
  align-items: center;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white; /* White text for logo */
}

.nav-links {
  margin-left:auto;
  margin-right:20px;
  display: flex;
  gap: 1.5rem; /* Space between nav links */
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s; /* Smooth transition for color */
}

.nav-link:hover {
  color: #e74c3c; /* Red hover for nav links */
}

.home-link {
  color: #e74c3c; /* Red for HOME link */
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.auth-button {
  background: none;
  border: 1px solid #e74c3c; /* Red border */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none; /* For router-link */
  font-size: 1rem;
  transition: background-color 0.3s, border-color 0.3s;
}

.auth-button:hover {
  background-color: #e74c3c; /* Red background on hover */
}

.sign-in-button {
  background-color: #e74c3c; /* Red background for Sign in */
}

.sign-in-button:hover {
  background-color: #c0392b; /* Darker red on hover */
  border-color: #c0392b;
}

.sign-up-button {
  background-color: transparent; /* Transparent background for Sign up */
}

.sign-up-button:hover {
  background-color: #e74c3c; /* Red background on hover */
}

.main-content {
  flex: 1;

}

.logout-button {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1rem; /* Match other nav-link font size */
}

.logout-button:hover {
  background-color: #34495e;
}

.footer {
  background-color: #1a1a1a; /* Dark background as in image */
  padding: 2rem; /* Adjusted padding for the footer */
  color: white;
  text-align: left;
}

.footer-content {
  max-width: 1200px; /* Adjust as needed to match your content width */
  margin: 0 auto;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: #a0a0a0; /* Lighter grey for copyright text */
}
</style> 