//@ts-nocheck
import type { Meta, StoryObj } from '@storybook/vue3';
import Select from './Select.vue';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: '',
    options: [
      { value: '1', label: 'Опция 1' },
      { value: '2', label: 'Опция 2' },
      { value: '3', label: 'Опция 3' },
    ],
    placeholder: 'Выберите значение',
    label: 'Выпадающий список',
  },
};

export const WithSelectedValue: Story = {
  args: {
    modelValue: '2',
    options: [
      { value: '1', label: 'Опция 1' },
      { value: '2', label: 'Опция 2' },
      { value: '3', label: 'Опция 3' },
    ],
    label: 'Выпадающий список',
  },
};

export const WithoutLabel: Story = {
  args: {
    modelValue: '',
    options: [
      { value: '1', label: 'Опция 1' },
      { value: '2', label: 'Опция 2' },
      { value: '3', label: 'Опция 3' },
    ],
    placeholder: 'Выберите значение',
  },
}; 