import { ref } from 'vue';
import {API} from "@/constants/api.ts";

export function useTeamAdd() {
    const loading = ref(false);
    const error = ref('');
    const success = ref(false);

    async function addTeam(teamData: any) {
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
                error.value = data.error || 'Ошибка при добавлении команды';
            } else {
                success.value = true;
            }
            return data;
        } catch (e: any) {
            error.value = e.message || 'Ошибка сети';
        } finally {
            loading.value = false;
        }
    }

    return { addTeam, loading, error, success };
}
