<template>
  <div class="register-status-page">
    <h2>Error!</h2>
    <div class="status-box error">
      <p>Что-то пошло не так при обработке вашей регистрации.</p>
      <div class="btn-row">
        <button class="btn" @click="goToEvent">Back to event</button>
        <button class="btn btn-secondary" @click="goToSupport">Support</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function goToEvent() {
  router.push({ name: 'home' });
}
function goToSupport() {
  window.open('mailto:support@acebattle.events', '_blank');
}
</script>
<style scoped>
.register-status-page { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; }
.status-box { border: 1.5px solid #d32f2f; background: #fff8f8; border-radius: 8px; padding: 2rem 2.5rem; margin-top: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.status-box.error { border-color: #d32f2f; color: #222; }
.btn-row { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; }
.btn { padding: 0.6rem 1.5rem; border-radius: 6px; border: none; background: #eee; color: #222; font-weight: 500; cursor: pointer; transition: background 0.2s; }
.btn:hover { background: #e57373; color: #fff; }
.btn-secondary { background: #ffeaea; color: #d32f2f; border: 1px solid #d32f2f; }
.btn-secondary:hover { background: #d32f2f; color: #fff; }
</style> 