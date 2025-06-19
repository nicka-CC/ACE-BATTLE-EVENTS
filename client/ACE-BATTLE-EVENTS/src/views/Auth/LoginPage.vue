<script setup lang="ts">
import { ref } from 'vue';
import Input from '../../components/ui/Input/Input.vue';
import Button from '../../components/ui/Button/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
import { useAuth } from '../../composables/useAuth';

const { email, password, loginError, handleLogin } = useAuth();

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
        <form @submit.prevent="handleLogin" class="auth-form">
          <h2 class="auth-title">Sign-In</h2>
          <Input
              v-model="email"
              type="email"
              label="Email*"
              placeholder="Enter your email"
          />
          <Input
              v-model="password"
              type="password"
              label="Password*"
              placeholder="Enter your password"
          />
          <Button buttonType="submit" label="Connect AceBattleEvents" class="auth-button"></Button>
          <p v-if="loginError" class="error-message">{{ loginError }}</p>
          <router-link to="/register" class="auth-link">I don’t have an account yet, sign up</router-link>
        </form>
      </div>

    </div>

  </div>
</template>

<style scoped>
@media(max-width: 500px) {
  .img-sportsmen-header {
    display:none;
  }
  .img-sportsmen {
    display:none;
  }
}
.container-auth-form{
  height: 524px
}
.img-sportsmen{
  height: 524px
}
.form-container {
  display:flex;
  position: absolute
}
.line_button{
  height:30px
}
.container-red{
  width: 100vw;
  height: 100vh;
  display: flex;
}
.img-sportsmen-header{
  width: 100%;
}
.red{
  background: #FF0000;
  width:37%;
  height:90%
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
</style> 