<script setup lang="ts">
import { ref } from 'vue';
import Select from '@/components/ui/Select/Select.vue';
import { useRouter } from 'vue-router';

const isEventsMenuOpen = ref(true);
const toggleEventsMenu = () => {
  isEventsMenuOpen.value = !isEventsMenuOpen.value;
};

const selectOptions = ref([
  { value: 'events-all', label: 'See all events' },
  { value: 'events-add', label: 'Add event' },
]);
const selectOptions2 = ref([
  { value: 'players-all', label: 'See all players' },
  { value: 'players-add', label: 'Add player' },
])
const selectOptions3 = ref([
  { value: 'teams-all', label: 'See all teams' },
  { value: 'teams-add', label: 'Add team' },
])

const selectedAction = ref('');
const router = useRouter();

const handleSelect = (value) => {
  // Сброс значения, чтобы повторный выбор тоже срабатывал
  selectedAction.value = '';
  setTimeout(() => {
    selectedAction.value = value;
    if (value === 'events-all') router.push('/admin-panel/events/all');
    else if (value === 'events-add') router.push('/admin-panel/events/add');
    else if (value === 'players-all') router.push('/admin-panel/players/all');
    else if (value === 'players-add') router.push('/admin-panel/players/add');
    else if (value === 'teams-all') router.push('/admin-panel/teams/all');
    else if (value === 'teams-add') router.push('/admin-panel/teams/add');
  }, 0);
};
</script>

<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2 class="sidebar-title">ADMIN</h2>
      <Select
        :options="selectOptions"
        :modelValue="selectedAction"
        @update:modelValue="handleSelect"
        placeholder="EVENTS"
        style="margin: 10px 1vh; width: 90%;"
      />
      <Select
          :options="selectOptions3"
          :modelValue="selectedAction"
          @update:modelValue="handleSelect"
          placeholder="TEAMS"
          style="margin: 10px 1vh; width: 90%;"
      />
      <Select
          :options="selectOptions2"
          :modelValue="selectedAction"
          @update:modelValue="handleSelect"
          placeholder="PLAYERS"
          style="margin: 10px 1vh; width: 90%;"
      />
    </aside>
    <main class="admin-content-area">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
@media(max-width: 500px) {
  .sidebar-title {
    display: none !important;
  }
  .sidebar{
    display: flex !important;
    width:100% !important;
  }
  .admin-dashboard {
    flex-direction: column !important;
  }
}
.admin-dashboard {
  display: flex;
  min-height: calc(100vh - 60px); /* Adjust based on your header height */
}

.sidebar {
  width: 250px;
  background-color: #2c2c2c; /* Dark background from image */
  color: white;
  padding: 1rem 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 0 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #3a3a3a; /* Darker line */
  margin-bottom: 1rem;
}

.nav-item i {
  margin-right: 0.8rem;
  font-size: 1.1rem;
}

.submenu li {
  border-bottom: 1px solid #4a4a4a;
}


.admin-content-area {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f0f2f5; /* Lighter background for content */
}

.nav-item .svg-inline--fa {
  margin-right: 0.8rem;
  width: 1.1em; /* Adjust based on icon size preference */
  height: 1.1em;
}
</style> 