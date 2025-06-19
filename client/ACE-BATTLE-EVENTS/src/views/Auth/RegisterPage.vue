<script setup lang="ts">
import Input from '../../components/ui/Input/Input.vue';
import Checkbox from "@/components/ui/Checkbox/Checkbox.vue";
import {useReg} from "@/composables/useReg.ts";
const {name,surname,termsAccepted,country,city,club,handleRegister,email,registerError,password} = useReg();

const countryOptions = [
  {value: 'AZ', label: 'Азербайджан'},
  {value: 'AM', label: 'Армения'},
  {value: 'BY', label: 'Беларусь'},
  {value: 'KZ', label: 'Казахстан'},
  {value: 'KG', label: 'Кыргызстан'},
  {value: 'MD', label: 'Молдова'},
  {value: 'AF', label: 'Афганистан'},
  {value: 'RU', label: 'Россия'},
];


</script>

<template>
  <div class="auth-container">
    <img src="./IMG_1023%203.png" alt="header" class="img-sportsmen-header"/>
    <div class="container-red">
      <div class="red"></div>
    </div>
    <div class="line_button"></div>
    <div class="form-container">
      <div>
        <img src="./_DSC6776.png" alt="img" class="img-sportsmen"/>
      </div>
      <div class="container-auth-form">

        <form @submit.prevent="handleRegister" class="auth-form">
          <h2 class="auth-title">Регистрация</h2>
          <Input v-model="name" type="text" label="Name*" placeholder="Enter your name"/>
          <Input v-model="surname" type="text" label="Surname*" placeholder="Enter your surname"/>
          <Input v-model="email" type="email" label="Email*" placeholder="Enter your email"/>
          <Input v-model="club" type="text" label="Club" placeholder="Enter your club (optional)"/>
          <div class="city-country-group">
            <Input v-model="city" type="text" label="City*" placeholder="Enter your city" class="city-input"/>
          </div>
          <select v-model="country" class="country-select" required>
            <option value="" disabled>Choose country</option>
            <option v-for="option in countryOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <Input v-model="password" type="password" label="Password*" placeholder="Enter password"/>
          <Checkbox
              v-model="termsAccepted"
              label="I agree with rules and terms of “Ace Battle Event”"
          />
          <button type="submit" class="auth-button">Connect AceBattleEvents</button>
          <p v-if="registerError" class="error-message">{{ registerError }}</p>
          <router-link to="/login" class="auth-link">I’m already have an account, sign in</router-link>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>

@media (max-width: 500px) {
  .img-sportsmen-header {
    display: none;
  }

  .img-sportsmen {
    display: none;
  }
  .container-red {
    height: 1020px !important;
  }
  .red{
    width: 100% !important;
    height: 100% !important;
}
  .auth-form {
    overflow-y: hidden;
    height: auto !important;
  }
  .container-auth-form {
    height: auto !important;
  }
}

.container-auth-form {
  height: 524px
}

.img-sportsmen {
  height: 524px
}

.form-container {
  display: flex;
  position: absolute
}

.line_button {
  height: 30px
}

.container-red {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.img-sportsmen-header {
  width: 100%;
}

.red {
  background: #FF0000;
  width: 37%;
  height: 90%
}

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(80vh); /* Adjust based on your header/footer height */
  background-color: #f7f7f7;
}

.auth-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-form {
  overflow-y: auto;
  height: 524px;
  background-color: white;
  padding: 2rem;
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


.country-select {
  padding: 0.5rem;
  border: 1px solid #000000;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #1f2937;
  height: 40px;
  transition: border-color 0.2s;
  background: white;
}

.country-select:hover {
  border-color: #9ca3af;
}

.country-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
</style> 