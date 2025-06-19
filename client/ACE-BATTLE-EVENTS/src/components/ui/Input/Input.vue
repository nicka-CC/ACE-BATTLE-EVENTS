<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="input"
      :class="{ 'input-error': error }"
    />
<!--    <span v-if="error" class="error-message">{{ error }}</span>-->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  label?: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 16px;
  color: #000000;
}

.input {
  padding: 0.5rem;
  border: 1px solid #000000;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #1f2937;
  transition: border-color 0.2s;
}

.input:hover {
  border-color: #9ca3af;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.input-error {
  border-color: #ef4444;
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
}
</style> 