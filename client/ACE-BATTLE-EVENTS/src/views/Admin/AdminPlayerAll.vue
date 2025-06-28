<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEventsList } from '@/composables/useEventsList';

const years = [2022, 2023, 2024, 2025];
const months = [
  { value: '', label: 'All' },
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];
const search = ref('');
const year = ref(new Date().getFullYear());
const month = ref('');
const country = ref('');
const itemsPerPage = 6;

const { events, total, loading, error, currentPage, totalPages, fetchEvents } = useEventsList();

function handleSearch() {
  console.log('month:', month.value);
  fetchEvents({ search: search.value, year: year.value, month: month.value, page: 1, itemsPerPage });
}
function handlePageChange(page) {
  fetchEvents({ search: search.value, year: year.value, month: month.value, page, itemsPerPage });
}
function editEvent(event) {
  // Здесь логика перехода на страницу редактирования
  alert('Редактировать: ' + event.title);
}

onMounted(() => {
  fetchEvents({ search: '', year: year.value, month: month.value, page: 1, itemsPerPage });
});
</script>

<template>
  <div class="admin-events-all">
    <div class="filters-row">
      <div class="filters">
        <div class="filter-group">
          <label>YEAR</label>
          <select v-model="year" @change="handleSearch">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
          <div class="filter-group">
        <label>MONTH</label>
        <select v-model.number="month" @change="handleSearch">
          <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
        </select>
        </div>
      </div>
      <input class="search-input" v-model="search" @input="handleSearch" placeholder="SEARCH EVENTS" />
    </div>
    <div class="table-wrapper">
      <table class="events-table">
        <thead>
        <tr>
          <th class="red-header" colspan="4">
            <div class="header-row">
              <span style="text-align: center">NAME</span>
              <span style="text-align: center">COMPETITION DATE</span>
              <span style="text-align: center">CREATED AT</span>
              <span style="text-align: center">EVENT PAGE</span>
<span></span>
            </div>
            <div class="header-triangle"></div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="event in events" :key="event.id">
          <td style="color:black; text-align: center">{{ event.title }}</td>
          <td style="color:black; text-align: center">{{ new Date(event.startDate).toLocaleDateString() }}</td>
          <td style="color:black; text-align: center">{{ new Date(event.createdAt).toLocaleString() }}</td>
          <td style="color:black; text-align: center">
            <a :href="`/event/${event.id}`" class="event-link">CUP BENELUX PAGE</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <Button :disabled="currentPage === 1" type="pagination" @click="handlePageChange(currentPage - 1)">&#8592;</Button>
      <Button
          type="pagination"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="handlePageChange(page)"
      >{{ page }}</Button>
      <Button  type="pagination" :disabled="currentPage === totalPages" @click="handlePageChange(currentPage + 1)">&#8594;</Button>
    </div>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
span{
  text-color: black;
}
.admin-events-all {
  background: #fff;
  overflow-y: auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  max-width: 1100px;
  margin: 0 auto;
}
.filters-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.filters {
  display: flex;
  gap: 2rem;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.filter-group label {
  font-size: 0.85rem;
  color: #222;
  margin-bottom: 0.2rem;
}
.filters select {
  padding: 0.4rem 1.2rem 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: #f7f7f7;
}
.search-input {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 250px;
}
.table-wrapper {
  margin-top: 1rem;
}
.events-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.events-table thead tr {
  position: relative;
}
.red-header {
  background: #ee342c;
  color: #fff;
  padding: 0;
  position: relative;
  border: none;
}
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  font-weight: bold;
  font-size: 1rem;
}
.header-triangle {
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border-top: 48px solid #ee342c;
  border-left: 48px solid transparent;
  z-index: 2;
}
.events-table th, .events-table td {
  border: none;
}
.events-table tbody tr {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.events-table td {
  padding: 0.7rem 1rem;
  font-size: 1rem;
  vertical-align: middle;
}
.event-link {
  color: #ee342c;
  text-decoration: underline;
  font-weight: 500;
}
.edit-cell, .star-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}
.edit-btn, .star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  display: flex;
  align-items: center;
}
.edit-btn svg {
  color: #222;
}
.star-btn svg {
  stroke: #ee342c;
  fill: none;
}
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
.pagination button {
  background: #fff;
  border: 1px solid #ee342c;
  color: #ee342c;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}
.pagination button.active,
.pagination button:hover:not(:disabled) {
  background: #ee342c;
  color: #fff;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.loading, .error {
  text-align: center;
  margin-top: 1rem;
  color: #ee342c;
}
</style>
