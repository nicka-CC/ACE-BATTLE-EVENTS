<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const selectedValue = ref('EVENTS');

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const select = (action: string) => {
  selectedValue.value = action === 'all' ? 'See all events' : 'Add new';
  console.log('Selected:', action);
  // emit или router.push по желанию
};
</script>

<template>
  <div class="dropdown">
    <button class="dropdown-header" @click="toggle">
      <span class="title">{{ selectedValue }}</span>
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div class="dropdown-item" @click="select('all')">See all events</div>
      <div class="dropdown-item" @click="select('new')">Add new</div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  width: 200px;
  font-family: sans-serif;
  position: relative;
}

.dropdown-header {
  width: 100%;
  background-color: #ee342c;
  color: white;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.icon {
  margin-right: 8px;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  background-color: #471d1d; /* тёмно-красный */
  color: #d1d5db; /* светло-серый */
  border-top: 1px solid #fff;
}

.dropdown-item {
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #5a2a2a;
}
</style>
