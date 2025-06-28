import { ref } from 'vue';
import {API} from "@/constants/api.ts";

export function useEventsList() {
    const events = ref([]);
    const total = ref(0);
    const loading = ref(false);
    const error = ref('');
    const currentPage = ref(1);
    const totalPages = ref(1);

    async function fetchEvents({ search = '', year = '', month = '', country = '', page = 1, itemsPerPage = 6 }) {
        loading.value = true;
        error.value = '';
        try {
            const token = localStorage.getItem('userToken');
            const params = new URLSearchParams({
                search,
                current_page: page,
                year:year,
                month:month,
                country:country,
                items_per_page: itemsPerPage,
            });

            const body = {};
            if (year) body.year = year;
            if (month) body.month = month;
            if (country) body.contry = country;

            const response = await fetch(`${API}/event/all?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            if (response.ok) {
                events.value = data.events;
                total.value = data.total;
                currentPage.value = data.current_page;
                totalPages.value = data.total_pages;
            } else {
                error.value = data.error || 'Ошибка загрузки';
            }
        } catch (e) {
            error.value = e.message || 'Ошибка сети';
        } finally {
            loading.value = false;
        }
    }

    return { events, total, loading, error, currentPage, totalPages, fetchEvents };
}
