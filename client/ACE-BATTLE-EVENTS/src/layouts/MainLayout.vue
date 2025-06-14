<script setup lang="ts">
// Компонент использует setup script с TypeScript
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('userToken');
});

const handleLogout = () => {
  localStorage.removeItem('userToken');
  isLoggedIn.value = false; // Обновляем реактивное состояние
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="layout">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/login" class="nav-link">Вход</router-link>
      <router-link to="/register" class="nav-link">Регистрация</router-link>
      <router-link to="/contacts" class="nav-link">Контакты</router-link>
      <button v-if="isLoggedIn" @click="handleLogout" class="nav-link logout-button">Выход</button>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.main-content {
  flex: 1;
  padding: 2rem;
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
</style> 