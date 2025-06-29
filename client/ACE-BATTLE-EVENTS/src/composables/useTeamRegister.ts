import { ref } from 'vue';
import { API } from '@/constants/api.ts';

// Типы для данных команды и игрока
export type TeamData = {
  name: string;
  club: string;
  country: string;
  city: string;
  coathName: string;
  gender: string;
  sname: string;
  eventId: string;
  players:[];
};
export type PlayerData = {
  firstName: string;
  surName: string;
  gender: string;
  dateBirth: string;
  distance?: string;
  time?: string;
  image?: File | null;
};

export function useTeamRegister() {
  const loading = ref(false);
  const error = ref('');
  const success = ref(false);
  const teamId = ref<string | null>(null);

  // Создать команду
  async function createTeam(teamData: TeamData) {
    loading.value = true;
    error.value = '';
    success.value = false;
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API}/event/team/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(teamData)
      });
      const data = await response.json();
      if (!response.ok) {
        error.value = data.error || 'Ошибка при создании команды';
        return null;
      }
      teamId.value = data.id;
      return data;
    } catch (e) {
      error.value = (e instanceof Error ? e.message : 'Ошибка сети');
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Создать игрока и привязать к команде
  async function addPlayerToTeam(teamId: string, player: PlayerData) {
    loading.value = true;
    error.value = '';
    try {
      const token = localStorage.getItem('userToken');
      const formData = new FormData();
      formData.append('json', JSON.stringify({
        firstName: player.firstName,
        surName: player.surName,
        gender: player.gender,
        dateBirth: player.dateBirth,
        distance: player.distance,
        time: player.time
      }));
      if (player.image) formData.append('image', player.image);
      const response = await fetch(`${API}/event/team/${teamId}/player`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });
      const data = await response.json();
      if (!response.ok) {
        error.value = data.error || 'Ошибка при добавлении игрока';
        return null;
      }
      return data;
    } catch (e) {
      error.value = (e instanceof Error ? e.message : 'Ошибка сети');
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Основная функция: создать команду и всех игроков
  async function registerTeamWithPlayers(teamData: TeamData, players: PlayerData[]) {
    error.value = '';
    success.value = false;
    loading.value = true;
    try {
      const team = await createTeam(teamData);
      if (!team || !team.id) {
        error.value = error.value || 'Ошибка создания команды';
        return false;
      }
      for (const player of players) {
        const res = await addPlayerToTeam(team.id, player);
        if (!res) {
          error.value = error.value || 'Ошибка добавления игрока';
          return false;
        }
      }
      success.value = true;
      return true;
    } catch (e) {
      error.value = (e instanceof Error ? e.message : 'Ошибка регистрации');
      return false;
    } finally {
      loading.value = false;
    }
  }

  return { registerTeamWithPlayers, loading, error, success, teamId };
}
