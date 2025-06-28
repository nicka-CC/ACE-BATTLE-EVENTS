import { ref } from 'vue';
import {API} from "@/constants/api.ts";

export function useEvent() {
    const loading = ref(false);
    const error = ref('');
    const success = ref(false);

    async function addEvent(eventData: any) {
        loading.value = true;
        error.value = '';
        success.value = false;

        try {
            const token = localStorage.getItem('userToken');

            // 1. Создаем основное событие
            const eventResponse = await fetch(`${API}/event/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    name: eventData.name,
                    start_date: eventData.start_date,
                    start_time: eventData.start_time,
                    end_date: eventData.end_date,
                    discipline: eventData.discipline,
                    category: eventData.category,
                    contry: eventData.contry,
                    city: eventData.city,
                    street: eventData.street,
                    postal_code: eventData.postal_code
                })
            });

            const eventResult = await eventResponse.json();
            if (!eventResponse.ok) {
                error.value = eventResult.error || 'Ошибка при создании события';
                return;
            }

            const eventId = eventResult.id;

            // 2. Добавляем призы (если есть)
            if (eventData.prizes && eventData.prizes.length > 0) {
                for (const prize of eventData.prizes) {
                    if (prize.place && prize.amount) {
                        await fetch(`${API}/event/price/${eventId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({
                                place: prize.place,
                                amount: Number(prize.amount)
                            })
                        });
                    }
                }
            }

            // 3. Добавляем картинки (если есть)
            if (eventData.introImage) {
                const introFormData = new FormData();
                introFormData.append('image', eventData.introImage);

                await fetch(`${API}/event/picture/${eventId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    body: introFormData
                });
            }

            success.value = true;
            return eventResult;

        } catch (e: any) {
            error.value = e.message || 'Ошибка сети';
        } finally {
            loading.value = false;
        }
    }

    return { addEvent, loading, error, success };
}