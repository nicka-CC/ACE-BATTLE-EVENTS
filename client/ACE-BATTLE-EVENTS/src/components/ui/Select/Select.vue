<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}>();
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const select = (value: string | number) => {
  emit('update:modelValue', value);
  isOpen.value = false;
};
</script>

<template>
  <div class="dropdown">
    <button class="dropdown-header" @click="toggle">
      <span class="title">
        {{ props.options.find(opt => opt.value === props.modelValue)?.label || props.placeholder || 'Выберите...' }}
      </span>
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <div
        v-for="option in props.options"
        :key="option.value"
        class="dropdown-item"
        @click="select(option.value)"
      >
        {{ option.label }}
      </div>
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
