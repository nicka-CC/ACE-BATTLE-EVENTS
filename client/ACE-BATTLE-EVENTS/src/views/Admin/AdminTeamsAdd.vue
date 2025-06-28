<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/ui/Input/Input.vue';
import Button from '@/components/ui/Button/Button.vue';
import { useTeamAdd } from '@/composables/useTeamAdd';

const name = ref('');
const club = ref('');
const country = ref('');
const city = ref('');
const coathName = ref('');
const gender = ref('');
const sname = ref('');
const players = ref([]); // массив id игроков
const eventId = ref('');

const { addTeam, loading, error, success } = useTeamAdd();

async function handleSubmit() {
  await addTeam({
    name: name.value,
    club: club.value,
    country: country.value,
    city: city.value,
    coathName: coathName.value,
    gender: gender.value,
    sname: sname.value,
    players: players.value,
    eventId: eventId.value
  });
}
</script>

<template>
  <div class="admin-sub-page">
    <h2>ADD TEAM</h2>
    <form @submit.prevent="handleSubmit" class="event-form">
      <div class="form-block">
        <Input v-model="name" label="Team name" placeholder="Enter team name" />
        <Input v-model="club" label="Club" placeholder="Enter club" />
        <Input v-model="country" label="Country" placeholder="Enter country" />
        <Input v-model="city" label="City" placeholder="Enter city" />
        <Input v-model="coathName" label="Coach name" placeholder="Enter coach name" />
        <Input v-model="gender" label="Gender" placeholder="Enter gender" />
        <Input v-model="sname" label="Short name" placeholder="Enter short name" />
        <Input v-model="eventId" label="Event ID" placeholder="Enter event ID" />
        <Input v-model="players" label="Players (IDs через запятую)" placeholder="1,2,3" @input="e => players.value = e.target.value.split(',').map(x => x.trim()).filter(Boolean)" />
      </div>
      <div class="btn-row">
        <Button label="Submit" type="form" buttonType="submit" />
      </div>
      <div v-if="loading">Loading...</div>
      <div v-if="error">Ошибка: {{ error }}</div>
      <div v-if="success">Команда успешно добавлена!</div>
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
