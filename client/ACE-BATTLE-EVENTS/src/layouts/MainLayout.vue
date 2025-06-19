<script setup lang="ts">
// Компонент использует setup script с TypeScript
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// Removed isLoggedIn reactive state as per new design
// const isLoggedIn = ref(false);

// onMounted(() => {
//   isLoggedIn.value = !!localStorage.getItem('userToken');
// });

const handleLogout = () => {
  localStorage.removeItem('userToken');
  // isLoggedIn.value = false; // Обновляем реактивное состояние
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="layout">
    <nav class="navbar">
      <div class="logo">ACE BATTLE EVENTS</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link home-link">HOME</router-link>
        <router-link to="/calendar" class="nav-link">CALENDAR</router-link>
        <router-link to="/close-events" class="nav-link">CLOSE EVENTS</router-link>
      </div>
      <div class="auth-buttons">
        <router-link to="/login" class="auth-button sign-in-button">Sign in</router-link>
        <router-link to="/register" class="auth-button sign-up-button">Sign up</router-link>
        <button v-if="false" @click="handleLogout" class="auth-button logout-button">Выход</button>
      </div>
    </nav>
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
  //padding: 2rem 0; /* Changed padding to 2rem top/bottom, 0 left/right */
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