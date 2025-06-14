<script setup lang="ts">
import { ref } from 'vue';
import Input from '../../components/ui/Input/Input.vue';
import Select from '../../components/ui/Select/Select.vue';
import Checkbox from '../../components/ui/Checkbox/Checkbox.vue';

const name = ref('');
const surname = ref('');
const email = ref('');
const club = ref('');
const city = ref('');
const country = ref('');
const password = ref('');
const termsAccepted = ref(false);
const registerError = ref('');

const countryOptions = [
  { value: 'USA', label: 'США' },
  { value: 'CAN', label: 'Канада' },
  { value: 'MEX', label: 'Мексика' },
  { value: 'GBR', label: 'Великобритания' },
  { value: 'GER', label: 'Германия' },
  { value: 'FRA', label: 'Франция' },
  { value: 'AUS', label: 'Австралия' },
  { value: 'RUS', label: 'Россия' },
];

const handleRegister = async () => {
  registerError.value = '';

  if (!termsAccepted.value) {
    registerError.value = 'Вы должны согласиться с правилами и условиями.';
    return;
  }

  try {
    const response = await fetch('http://localhost:5555/auth/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
        club: club.value,
        city: city.value,
        country: country.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registration successful:', data);
      // Здесь можно добавить логику перенаправления или уведомления об успехе
    } else {
      registerError.value = data.message || 'Ошибка регистрации';
      console.error('Registration failed:', data);
    }
  } catch (error) {
    registerError.value = 'Сетевая ошибка или сервер недоступен';
    console.error('Registration error:', error);
  }
};
</script>

<template>
  <div class="auth-container">
    <h2 class="auth-title">Регистрация</h2>
    <form @submit.prevent="handleRegister" class="auth-form">
      <Input v-model="name" type="text" label="Имя*" placeholder="Введите ваше имя" />
      <Input v-model="surname" type="text" label="Фамилия*" placeholder="Введите вашу фамилию" />
      <Input v-model="email" type="email" label="Email*" placeholder="Введите ваш email" />
      <Input v-model="club" type="text" label="Клуб" placeholder="Введите ваш клуб (необязательно)" />
      <div class="city-country-group">
        <Input v-model="city" type="text" label="Город*" placeholder="Введите ваш город" class="city-input" />
        <Select
          v-model="country"
          :options="countryOptions"
          label="Страна*"
          placeholder="Выберите страну"
          class="country-select"
        />
      </div>
      <Input v-model="password" type="password" label="Пароль*" placeholder="Введите пароль" />
      <Checkbox
        v-model="termsAccepted"
        label="Я согласен с правилами и условиями Ace Battle Event"
      />
      <button type="submit" class="auth-button">Зарегистрироваться</button>
      <p v-if="registerError" class="error-message">{{ registerError }}</p>
      <router-link to="/login" class="auth-link">У меня уже есть аккаунт, войти</router-link>
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

.city-country-group {
  display: flex;
  gap: 1rem;
}

.city-input,
.country-select {
  flex: 1;
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