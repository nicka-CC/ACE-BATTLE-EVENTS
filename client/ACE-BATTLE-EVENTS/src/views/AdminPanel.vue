<script setup lang="ts">
import { ref } from 'vue';

const isEventsMenuOpen = ref(true);
const toggleEventsMenu = () => {
  isEventsMenuOpen.value = !isEventsMenuOpen.value;
};
</script>

<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2 class="sidebar-title">ADMIN</h2>
      <nav class="sidebar-nav">
        <div class="nav-item" :class="{ 'active': isEventsMenuOpen }">
          <div class="nav-header" @click="toggleEventsMenu">
            <font-awesome-icon icon="fa-solid fa-calendar-alt" /> EVENTS
            <span class="toggle-icon">{{ isEventsMenuOpen ? '▲' : '▼' }}</span>
          </div>
          <ul v-if="isEventsMenuOpen" class="submenu">
            <li><router-link to="/admin-panel/events/all" class="submenu-link">See all events</router-link></li>
            <li><router-link to="/admin-panel/events/add" class="submenu-link">Add new</router-link></li>
          </ul>
        </div>
        <router-link to="/admin-panel/clubs" class="nav-item"><font-awesome-icon icon="fa-solid fa-users" /> CLUBS <span class="toggle-icon">▲</span></router-link>
        <router-link to="/admin-panel/teams" class="nav-item"><font-awesome-icon icon="fa-solid fa-users" /> TEAMS <span class="toggle-icon">▲</span></router-link>
        <router-link to="/admin-panel/players" class="nav-item"><font-awesome-icon icon="fa-solid fa-running" /> PLAYERS <span class="toggle-icon">▲</span></router-link>
      </nav>
    </aside>
    <main class="admin-content-area">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
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

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid #3a3a3a;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative; /* For toggle icon positioning */
}

.nav-item.active {
  background-color: #e74c3c; /* Red background for active/expanded item */
}

.nav-item:hover:not(.active) {
  background-color: #3a3a3a; /* Slightly lighter dark on hover */
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-item i {
  margin-right: 0.8rem;
  font-size: 1.1rem;
}

.toggle-icon {
  font-size: 0.8rem;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #3d3d3d; /* Darker shade for submenu */
}

.submenu li {
  border-bottom: 1px solid #4a4a4a;
}

.submenu-link {
  display: block;
  padding: 0.8rem 1.5rem 0.8rem 2.5rem; /* Indent submenu items */
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}

.submenu-link:hover {
  background-color: #4a4a4a;
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