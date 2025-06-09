<script setup lang="ts">
// Компонент использует setup script с TypeScript
</script>

<template>
  <div class="layout">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/admin-panel" class="nav-link">Админ панель</router-link>
      <router-link to="/contacts" class="nav-link">Контакты</router-link>
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
</style> 