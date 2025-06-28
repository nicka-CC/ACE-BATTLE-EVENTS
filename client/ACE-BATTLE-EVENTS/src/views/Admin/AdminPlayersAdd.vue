<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Input from '@/components/ui/Input/Input.vue';
import Button from '@/components/ui/Button/Button.vue';
import { usePlayerAdd } from '@/composables/usePlayerAdd';

const firstName = ref('');
const surName = ref('');
const gender = ref('male');
const dateBirth = ref('');
const image = ref<File|null>(null);
const teamId = ref('');
const teams = ref([{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7}]);
const imagePreview = ref('');

const { addPlayer, loading, error, success } = usePlayerAdd();

async function fetchTeams() {
  const token = localStorage.getItem('userToken');
  const res = await fetch('http://localhost:5555/team/all', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  teams.value = data.teams || data || [];
}

function handleImage(e) {
  const file = e.target.files[0];
  image.value = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = e => imagePreview.value = e.target?.result as string;
    reader.readAsDataURL(file);
  } else {
    imagePreview.value = '';
  }
}

async function handleSubmit() {
  await addPlayer({
    teamId: teamId.value,
    firstName: firstName.value,
    surName: surName.value,
    gender: gender.value,
    dateBirth: dateBirth.value,
    image: image.value
  });
}

onMounted(fetchTeams);
</script>

<template>
  <div class="admin-sub-page">
    <h2>ADD PLAYER</h2>
    <form @submit.prevent="handleSubmit" class="player-form">
      <h3>PLAYER INFO</h3>
      <div class="row">
        <div class="col">
          <Input v-model="firstName" label="First name*" placeholder="Enter name here..." required />
          <Input v-model="surName" label="Surname*" placeholder="Enter surname here..." required />
        </div>
        <div class="col">
          <label>Gender</label>
          <div class="gender-row">
            <label><input type="radio" value="male" v-model="gender" /> Male</label>
            <label><input type="radio" value="female" v-model="gender" /> Female</label>
          </div>
          <Input v-model="dateBirth" label="Date of birth" type="date" placeholder="DD/MM/YYYY" />
          <label>Team</label>
          <select v-model="teamId" required>
            <option value="" disabled>Select team...</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.id }}</option>
          </select>
        </div>
      </div>
      <div class="media-block">
        <label>UPLOAD INTRO IMAGE</label>
        <input type="file" accept="image/*" @change="handleImage" />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="preview" style="max-width:200px;max-height:200px;display:block;margin:1rem auto;" />
        </div>
      </div>
      <div class="btn-row">
        <Button label="UPLOAD Player" type="form" buttonType="submit" />
      </div>
      <div v-if="loading">Loading...</div>
      <div v-if="error">Ошибка: {{ error }}</div>
      <div v-if="success">Игрок успешно добавлен!</div>
    </form>
  </div>
</template>

<style scoped>
.admin-sub-page { padding: 1rem;color:black }
.player-form { max-width: 700px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 2rem; }
h3 { text-align: center; margin-bottom: 2rem; }
.row { display: flex; gap: 2rem; }
.col { flex: 1; display: flex; flex-direction: column; gap: 1.2rem; }
.gender-row { display: flex; gap: 1.5rem; margin-bottom: 1rem; }
.media-block { margin: 2rem 0; text-align: center; }
.btn-row { display: flex; justify-content: flex-end; margin-top: 1.5rem; }
.image-preview img { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
select { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; margin-top: 0.5rem; }
</style>
