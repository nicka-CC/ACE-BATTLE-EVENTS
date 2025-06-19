<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <label class="checkbox-wrapper" :class="{ 'checkbox-disabled': disabled }">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      :disabled="disabled"
      class="checkbox-input"
    />
    <span class="checkbox-custom"></span>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  position: relative;
  height: 20px;
  width: 20px;
  min-height: 20px;
  min-width: 20px;
  background-color: white;
  border: 2px solid #000000;
  border-radius: 1rem;
  transition: all 0.2s;
}

.checkbox-input:checked ~ .checkbox-custom {
  background: rgba(0, 128, 0, 0);
}

.checkbox-input:checked ~ .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background: #FF0000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  font-size: 23px;
  color: #000000;
}

.checkbox-input:focus ~ .checkbox-custom {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
</style> 