<script setup lang="ts">
// Компонент использует setup script с TypeScript
</script>

<template>
  <div class="admin-panel">
    <h1>Админ-панель</h1>
    <div class="admin-content">
      <div class="admin-section">
        <h2>Управление турнирами</h2>
        <button class="admin-button">Создать турнир</button>
        <button class="admin-button">Управление турнирами</button>
      </div>
      <div class="admin-section">
        <h2>Управление пользователями</h2>
        <button class="admin-button">Список пользователей</button>
        <button class="admin-button">Настройки доступа</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-panel {
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.admin-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.admin-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #34495e;
  margin-bottom: 1rem;
}

.admin-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.admin-button:hover {
  background-color: #2980b9;
}
</style> 