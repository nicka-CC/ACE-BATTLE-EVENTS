<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {API} from "@/constants/api.ts";

const router = useRouter();

// Мокнутый адрес кошелька
const walletAddress = '0x92123...2dd212';

// Сумма и валюта (валюта — только визуал)
const sum = ref('');
const selectedPreset = ref('');
const presets = [
  { value: '20', label: 'MC' },
  { value: '0.23', label: 'ETH' },
  { value: '500', label: 'EU' }
];

// Данные карты
const numberCard = ref('');
const dateCard = ref('');
const cvv = ref('');
const agree = ref(false);

// Состояния
const loading = ref(false);
const error = ref('');
const step = ref(1); // 1 — ввод карты, 2 — подтверждение

// Для подтверждения
const confirmCvv = ref('');
const confirmLoading = ref(false);
const confirmError = ref('');
const success = ref(false);

// Хендлер выбора пресета
function selectPreset(preset) {
  sum.value = preset.value;
  selectedPreset.value = preset.label;
}

// Первый шаг — отправка данных карты
async function handleProceed() {
  error.value = '';
  if (!sum.value || !numberCard.value || !dateCard.value || !cvv.value || !agree.value) {
    error.value = 'Please fill all fields and agree to the policies.';
    return;
  }
  loading.value = true;
  try {
    const token = localStorage.getItem('userToken');
    const res = await fetch(`${API}/user/balance/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        count: Number(sum.value),
        numberCard: numberCard.value,
        cvv: Number(cvv.value),
        dateCard: dateCard.value
      })
    });
    const data = await res.json();
    if (!res.ok) {
      error.value = data.error || 'Error while creating transaction';
      return;
    }
    step.value = 2;
  } catch (e) {
    error.value = e.message || 'Network error';
  } finally {
    loading.value = false;
  }
}

// Второй шаг — подтверждение
async function handleConfirm() {
  confirmError.value = '';
  if (!confirmCvv.value) {
    confirmError.value = 'Enter CVV to confirm.';
    return;
  }
  confirmLoading.value = true;
  try {
    const token = localStorage.getItem('userToken');
    const res = await fetch(`${API}/user/balance/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ cvv: Number(confirmCvv.value) })
    });
    const data = await res.json();
    if (!res.ok) {
      confirmError.value = data.error || 'Error while confirming transaction';
      return;
    }
    success.value = true;
  } catch (e) {
    confirmError.value = e.message || 'Network error';
  } finally {
    confirmLoading.value = false;
  }
}
</script>

<template>
  <div class="add-coins-root">
    <div class="add-coins-header">
      <h1>ADD COINS</h1>
    </div>
    <div class="add-coins-content">
      <!-- Desktop: форма и кошелек рядом, мобайл — друг под другом -->
      <div class="add-coins-form-block">
        <div class="form-title">Top up balance</div>
        <div class="form-group">
          <label class="form-label">Sum</label>
          <div class="presets-row">
            <button v-for="preset in presets" :key="preset.label" type="button" class="preset-btn" :class="{active: selectedPreset === preset.label}" @click="selectPreset(preset)">
              {{ preset.value }} <span>{{ preset.label }}</span>
            </button>
          </div>
          <input v-model="sum" class="input sum-input" placeholder="Enter sum" />
        </div>
        <div v-if="step === 1">
          <div class="form-group">
            <input v-model="numberCard" class="input" placeholder="Card number" maxlength="19" />
          </div>
          <div class="form-row">
            <input v-model="dateCard" class="input" placeholder="MM/YY" maxlength="5" />
            <input v-model="cvv" class="input" placeholder="CVV" maxlength="3" />
          </div>
          <div class="form-group agree-row">
            <input type="checkbox" v-model="agree" id="agree" />
            <label for="agree">I agree this policies and agreements</label>
          </div>
          <button class="proceed-btn" :disabled="loading" @click.prevent="handleProceed">Proceed</button>
          <div v-if="error" class="error-message">{{ error }}</div>
        </div>
        <div v-else-if="step === 2 && !success">
          <div class="form-group">
            <input v-model="confirmCvv" class="input" placeholder="Enter CVV to confirm" maxlength="3" />
          </div>
          <button class="proceed-btn" :disabled="confirmLoading" @click.prevent="handleConfirm">Confirm</button>
          <div v-if="confirmError" class="error-message">{{ confirmError }}</div>
        </div>
        <div v-else-if="success" class="success-message">
          Balance successfully topped up!
        </div>
      </div>
      <div class="add-coins-wallet-block">
        <div class="wallet-title">Your wallet</div>
        <div class="wallet-card">
          <div class="wallet-address">{{ walletAddress }}</div>
          <div class="wallet-icon"> <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M12 4L12 20M12 4L7 12L12 20L17 12L12 4Z" fill="#e53935"/></svg> </div>
        </div>
      </div>
    </div>
    <footer class="footer">ACE BATTLE EVENTS<br />© 2023 Ace Battle Association</footer>
  </div>
</template>

<style scoped>
.add-coins-root {
  background: #232323;
  color: #232323;
  min-height: 100vh;
  font-family: 'Montserrat', Arial, sans-serif;
}
.add-coins-header {
  background: url('/src/assets/intro-bg.jpg') center/cover no-repeat;
  padding: 32px 0 24px 0;
  text-align: center;
}
.add-coins-header h1 {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
}
.add-coins-content {
  display: flex;
  gap: 48px;
  max-width: 1100px;
  margin: 32px auto 0 auto;
  align-items: flex-start;
  justify-content: center;
}
.add-coins-form-block {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 32px 32px 24px 32px;
  min-width: 340px;
  max-width: 420px;
  flex: 1;
}
.form-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 18px;
}
.form-group {
  margin-bottom: 18px;
}
.form-label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
}
.presets-row {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}
.preset-btn {
  background: #fff;
  border: 2px solid #e53935;
  color: #e53935;
  border-radius: 8px;
  padding: 6px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.preset-btn.active, .preset-btn:hover {
  background: #e53935;
  color: #fff;
}
.sum-input {
  border: 2px solid #e53935;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  font-size: 1.1rem;
  margin-bottom: 0;
}
.input {
  border: 1.5px solid #bbb;
  border-radius: 8px;
  padding: 8px 12px;
  width: 100%;
  font-size: 1.05rem;
  margin-bottom: 0;
}
.form-row {
  display: flex;
  gap: 10px;
}
.agree-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.98rem;
}
.proceed-btn {
  background: #232323;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.proceed-btn:disabled {
  background: #bbb;
  color: #fff;
  cursor: not-allowed;
}
.error-message {
  color: #e53935;
  margin-top: 10px;
  font-size: 1rem;
}
.success-message {
  color: #4caf50;
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: 600;
}
.add-coins-wallet-block {
  flex: 1;
  min-width: 260px;
  max-width: 340px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wallet-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 18px;
}
.wallet-card {
  width: 100%;
  background: linear-gradient(120deg, #e53935 0%, #ffb347 100%);
  border-radius: 14px;
  padding: 22px 18px 18px 18px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  min-height: 80px;
}
.wallet-address {
  margin-bottom: 12px;
  font-size: 1.08rem;
  letter-spacing: 1px;
}
.wallet-icon {
  position: absolute;
  right: 18px;
  bottom: 12px;
}
.footer {
  text-align: center;
  color: #bbb;
  font-size: 0.95rem;
  margin: 48px 0 0 0;
  padding: 18px 0 8px 0;
}
@media (max-width: 900px) {
  .add-coins-content {
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
  }
  .add-coins-form-block, .add-coins-wallet-block {
    max-width: 100%;
    min-width: 0;
    margin: 0 auto;
  }
}
@media (max-width: 600px) {
  .add-coins-header {
    padding: 18px 0 12px 0;
  }
  .add-coins-header h1 {
    font-size: 1.2rem;
  }
  .add-coins-form-block, .add-coins-wallet-block {
    padding: 14px 8px 12px 8px;
    border-radius: 10px;
  }
  .form-title {
    font-size: 1.05rem;
    margin-bottom: 10px;
  }
  .wallet-title {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  .wallet-card {
    font-size: 0.98rem;
    padding: 12px 8px 10px 8px;
    min-height: 60px;
  }
  .footer {
    font-size: 0.8rem;
    padding: 10px 0 4px 0;
  }
}
</style> 