<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>Извините, страница не найдена.</p>
    <router-link to="/" class="home-link">Вернуться на главную</router-link>
  </div>
</template>

<script setup lang="ts">
// No script needed for a simple 404 page
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Takes full viewport height */
  text-align: center;
  background-color: #f7f7f7;
  color: #333;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #e74c3c;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style> 