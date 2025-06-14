<script setup lang="ts">
import { ref } from 'vue';
import Input from '../../components/ui/Input/Input.vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loginError = ref('');
const router = useRouter();

const handleLogin = async () => {
  loginError.value = '';
  try {
    const response = await fetch('http://localhost:5555/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      localStorage.setItem('userToken', data.token);
      router.push({ name: 'admin' });
    } else {
      loginError.value = data.message || 'Ошибка авторизации';
      console.error('Login failed:', data);
    }
  } catch (error) {
    loginError.value = 'Сетевая ошибка или сервер недоступен';
    console.error('Login error:', error);
  }
};
</script>

<template>
  <div class="auth-container">
    <h2 class="auth-title">Вход</h2>
    <form @submit.prevent="handleLogin" class="auth-form">
      <Input
        v-model="email"
        type="email"
        label="Email*"
        placeholder="Введите ваш email"
      />
      <Input
        v-model="password"
        type="password"
        label="Пароль*"
        placeholder="Введите ваш пароль"
      />
      <button type="submit" class="auth-button">Войти</button>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <router-link to="/register" class="auth-link">У меня нет аккаунта, зарегистрироваться</router-link>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px); /* Adjust based on your header/footer height */
  padding: 2rem;
  background-color: #f7f7f7;
}

.auth-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.auth-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth-button {
  background-color: #e74c3c;
  color: white;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #c0392b;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
}

.auth-link {
  color: #3498db;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
}

.auth-link:hover {
  text-decoration: underline;
}
</style> 