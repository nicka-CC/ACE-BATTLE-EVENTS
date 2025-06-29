<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from '@/components/ui/Input/Input.vue';
import Button from '@/components/ui/Button/Button.vue';
import { useTeamRegister } from '@/composables/useTeamRegister';
import type { TeamData, PlayerData } from '@/composables/useTeamRegister';

const router = useRouter();

// Данные команды
const team = ref<TeamData>({
  name: '',
  club: '',
  country: '',
  city: '',
  coathName: '',
  gender: '',
  sname: '',
  eventId: '',
  players:[]
});

// Динамический список игроков (минимум 2)
const players = ref<PlayerData[]>([
  { firstName: '', surName: '', gender: '', dateBirth: '', distance: '', time: '', image: null },
  { firstName: '', surName: '', gender: '', dateBirth: '', distance: '', time: '', image: null }
]);

const { registerTeamWithPlayers, loading, error } = useTeamRegister();

function addPlayer() {
  players.value.push({ firstName: '', surName: '', gender: '', dateBirth: '', distance: '', time: '', image: null });
}
function removePlayer(idx: number) {
  if (players.value.length > 2) players.value.splice(idx, 1);
}

async function handleSubmit() {
  // Валидация (минимум 2 игрока, все поля заполнены)
  if (!team.value.name || !team.value.country || !team.value.eventId) {
    alert('Заполните обязательные поля команды!');
    return;
  }
  for (const p of players.value) {
    if (!p.firstName || !p.surName || !p.gender || !p.dateBirth) {
      alert('Заполните все обязательные поля игроков!');
      return;
    }
  }
  const ok = await registerTeamWithPlayers(team.value, players.value);
  if (ok) {
    router.push({ name: 'register-team-success', query: { teamName: team.value.name, eventName: team.value.eventId } });
  } else {
    router.push({ name: 'register-team-error' });
  }
}
</script>

<template>
  <div class="admin-sub-page">
    <h2>ADD TEAM</h2>
    <form @submit.prevent="handleSubmit" class="event-form">
      <div class="form-block">
        <h3>Team details</h3>
        <Input v-model="team.name" label="Team name*" placeholder="Enter team name" />
        <Input v-model="team.club" label="Club" placeholder="Enter club" />
        <Input v-model="team.country" label="Country*" placeholder="Enter country" />
        <Input v-model="team.city" label="City" placeholder="Enter city" />
        <Input v-model="team.coathName" label="Coach name" placeholder="Enter coach name" />
        <Input v-model="team.gender" label="Gender" placeholder="Enter gender" />
        <Input v-model="team.sname" label="Short name" placeholder="Enter short name" />
        <Input v-model="team.eventId" label="Event ID*" placeholder="Enter event ID" />
      </div>
      <div class="form-block">
        <h3>Players</h3>
        <div v-for="(player, idx) in players" :key="idx" class="player-block">
          <div class="row">
            <Input v-model="player.firstName" label="First name*" placeholder="Enter first name" />
            <Input v-model="player.surName" label="Surname*" placeholder="Enter surname" />
          </div>
          <div class="row">
            <Input v-model="player.gender" label="Gender*" placeholder="Enter gender" />
            <Input v-model="player.dateBirth" label="Date of birth*" placeholder="YYYY-MM-DD" />
          </div>
          <div class="row">
            <Input v-model="player.distance" label="Distance" placeholder="ex: 1500 m" />
            <Input v-model="player.time" label="Time in seconds" placeholder="ex: 240" />
          </div>
          <div class="row">
            <input type="file" @change="e => player.image = e.target.files[0]" />
            <Button v-if="players.length > 2" label="Remove" type="danger" @click.prevent="removePlayer(idx)" />
          </div>
          <hr v-if="idx < players.length - 1" />
        </div>
        <Button label="Add player" type="secondary" @click.prevent="addPlayer" />
      </div>
      <div class="btn-row">
        <Button label="Add team" type="form" buttonType="submit" :disabled="loading" />
      </div>
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error-message">Ошибка: {{ error }}</div>
    </form>
  </div>
</template>

<style scoped>
.admin-sub-page { padding: 1rem; }
h2 { margin-bottom: 1rem; color: #333; }
.event-form { max-width: 600px; margin: 0 auto; }
.form-block { background: #fff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.row { display: flex; gap: 10px; margin-bottom: 0.5rem; }
.btn-row { display: flex; gap: 10px; justify-content: flex-end; margin-top: 1rem; }
.player-block { margin-bottom: 1.5rem; }
.error-message { color: #d32f2f; margin-top: 1rem; }
@media (max-width: 600px) {
  .event-form { max-width: 100%; padding: 0 0.5rem; }
  .form-block { padding: 1rem; }
  .row { flex-direction: column; gap: 5px; }
  .btn-row { flex-direction: column; gap: 8px; }
}
</style>
