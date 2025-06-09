<script setup lang="ts">
// Компонент использует setup script с TypeScript
</script>

<template>
  <div class="contacts">
    <h1>Контакты</h1>
    <div class="contact-info">
      <div class="contact-section">
        <h2>Свяжитесь с нами</h2>
        <p>Email: info@acebattleevents.com</p>
        <p>Телефон: +7 (XXX) XXX-XX-XX</p>
      </div>
      <div class="contact-section">
        <h2>Социальные сети</h2>
        <div class="social-links">
          <a href="#" class="social-link">Discord</a>
          <a href="#" class="social-link">Telegram</a>
          <a href="#" class="social-link">VK</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacts {
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.contact-info {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.contact-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #34495e;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.social-link:hover {
  background-color: #f0f0f0;
}
</style> 