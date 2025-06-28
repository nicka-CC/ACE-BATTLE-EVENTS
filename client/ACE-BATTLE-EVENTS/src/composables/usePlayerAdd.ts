import { ref } from 'vue';
import {API} from "@/constants/api.ts";

export function usePlayerAdd() {
    const loading = ref(false);
    const error = ref('');
    const success = ref(false);

    async function addPlayer({ teamId, firstName, surName, gender, dateBirth, image }) {
        loading.value = true;
        error.value = '';
        success.value = false;
        try {
            const token = localStorage.getItem('userToken');
            const formData = new FormData();
            formData.append('json', JSON.stringify({ firstName, surName, gender, dateBirth }));
            if (image) formData.append('image', image);
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
            } else {
                success.value = true;
            }
            return data;
        } catch (e) {
            error.value = e.message || 'Ошибка сети';
        } finally {
            loading.value = false;
        }
    }

    return { addPlayer, loading, error, success };
}
