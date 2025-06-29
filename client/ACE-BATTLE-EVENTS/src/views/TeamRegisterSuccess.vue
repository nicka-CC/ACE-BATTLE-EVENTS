<template>
  <div class="register-status-page">
    <h2>Success!</h2>
    <div class="status-box success">
      <p>Вы успешно зарегистрировали команду <b>{{ teamName }}</b> на <b>{{ eventName }}</b>.</p>
      <div class="btn-row">
        <button class="btn" @click="goToEvent">Back to event</button>
        <button class="btn btn-secondary" @click="goToRegistration">Check your registration</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const teamName = route.query.teamName || '';
const eventName = route.query.eventName || '';
function goToEvent() {
  router.push({ name: 'home' });
}
function goToRegistration() {
  router.push({ name: 'add-team' });
}
</script>
<style scoped>
.register-status-page { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; }
.status-box { border: 1.5px solid #4caf50; background: #f8fff8; border-radius: 8px; padding: 2rem 2.5rem; margin-top: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.status-box.success { border-color: #4caf50; color: #222; }
.btn-row { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; }
.btn { padding: 0.6rem 1.5rem; border-radius: 6px; border: none; background: #eee; color: #222; font-weight: 500; cursor: pointer; transition: background 0.2s; }
.btn:hover { background: #e57373; color: #fff; }
.btn-secondary { background: #ffeaea; color: #d32f2f; border: 1px solid #d32f2f; }
.btn-secondary:hover { background: #d32f2f; color: #fff; }
</style> 