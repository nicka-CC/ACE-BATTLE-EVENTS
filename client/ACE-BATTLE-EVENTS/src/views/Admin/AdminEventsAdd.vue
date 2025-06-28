<script setup lang="ts">
import { ref } from 'vue';
import { useEvent } from '@/composables/useEvent';
import Input from '@/components/ui/Input/Input.vue';
import Button from '@/components/ui/Button/Button.vue';

const step = ref(1);
const { addEvent, loading, error, success } = useEvent();

// Шаг 1: Информация о событии
const eventInfo = ref({
  name: '',
  start_date: '',
  start_time: '',
  end_date: '',
  discipline: '',
  category: '',
});

// Шаг 2: Локация
const location = ref({
  contry: '',
  city: '',
  street: '',
  postal_code: '',
});

// Шаг 3: Призы (опционально)
const prizes = ref([
  { place: '', amount: '' }
]);

// Шаг 4: Медиа (опционально)
const introImage = ref<File | null>(null);
const minorImage = ref<File | null>(null);

function nextStep() { step.value++; }
function prevStep() { step.value--; }

function addPrize() { prizes.value.push({ place: '', amount: '' }); }

async function handleSubmit() {
  // Собираем полную дату с временем
  const startDateTime = eventInfo.value.start_date && eventInfo.value.start_time
      ? `${eventInfo.value.start_date}T${eventInfo.value.start_time}:00.000Z`
      : eventInfo.value.start_date;

  const eventData = {
    ...eventInfo.value,
    start_time: startDateTime, // теперь это полная дата с временем
    ...location.value,
    prizes: prizes.value.filter(prize => prize.place && prize.amount),
    introImage: introImage.value,
    minorImage: minorImage.value
  };
  await addEvent(eventData);
}
</script>

<template>
  <div class="admin-sub-page">
    <h2>ADD EVENT</h2>
    <form @submit.prevent="handleSubmit" class="event-form">
      <div  class="form-block">
        <h2>EVENT INFORMATION</h2>
        <Input v-model="eventInfo.name" label="Event title" placeholder="Add event name" />
        <div class="row">
          <Input v-model="eventInfo.start_date" type="date" label="Choose start date" />
          <Input v-model="eventInfo.start_time" type="time" label="Start time" />
        </div>
        <Input v-model="eventInfo.end_date" type="date" label="Choose end date" />
        <div class="row">
          <Input v-model="eventInfo.discipline" label="Discipline" placeholder="outdoor" />
          <Input v-model="eventInfo.category" label="Category" placeholder="pro" />
        </div>
      </div>
      <div  class="form-block">
        <h2>LOCATION</h2>
        <div class="row">
          <Input v-model="location.contry" label="Country" placeholder="choose country" />
          <Input v-model="location.city" label="City" placeholder="Enter city" />
        </div>
        <div class="row">
          <Input v-model="location.street" label="Street" placeholder="Enter street" />
          <Input v-model="location.postal_code" label="Postal code" placeholder="Enter postal code" />
        </div>
      </div>
      <div class="form-block">
        <h2>PRIZES (Optional)</h2>
        <div v-for="(prize, idx) in prizes" :key="idx" class="row">
          <Input v-model="prize.place" label="PLACE" placeholder="choose place" />
          <Input v-model="prize.amount" label="AMOUNT" placeholder="Enter amount $" />
        </div>
        <div style="margin: 0 auto">
          <Button label="+" type="form" buttonType="button" @click="addPrize" style="margin-bottom: 1rem; " />
        </div>

      </div>
      <div  class="form-block">
        <h2>MEDIA (Optional)</h2>
        <div class="media-block">
          <label>UPLOAD INTRO IMAGE</label>
          <input type="file" @change="e => introImage = e.target.files?.[0] || null" />
          <label>UPLOAD MINOR IMAGE</label>
          <input type="file" @change="e => minorImage = e.target.files?.[0] || null" />
        </div>
        <div class="btn-row">
          <Button label="Submit" type="form" buttonType="submit" />
        </div>
      </div>
      <div v-if="loading">Loading...</div>
      <div v-if="error">Ошибка: {{ error }}</div>
      <div v-if="success">Событие успешно добавлено!</div>
    </form>
  </div>
</template>

<style scoped>
.admin-sub-page { padding: 1rem; }
h2 { margin-bottom: 1rem; color: #333; }
.event-form { max-width: 500px; margin: 0 auto; }
.form-block { background: #fff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.row { display: flex; gap: 5px; margin-bottom: 0.5rem; }
.btn-row { display: flex; gap: 10px; justify-content: flex-end; margin-top: 1rem; }
.media-block { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
@media (max-width: 600px) {
  .event-form { max-width: 100%; padding: 0 0.5rem; }
  .form-block { padding: 1rem; }
  .row { flex-direction: column; gap: 5px; }
  .btn-row { flex-direction: column; gap: 8px; }
}
</style>