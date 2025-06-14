//@ts-nocheck
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Input from './Input.vue'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    modelValue: '',
    type: 'text',
    placeholder: 'Введите текст',
    label: 'Текстовое поле',
  }
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя'
  }
}

export const WithError: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    modelValue: 'неверное значение',
    type: 'text',
    label: 'Текстовое поле',
    error: 'Это поле обязательно для заполнения',
  }
}

export const FullWidth: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Полный размер',
    placeholder: 'Введите текст',
    fullWidth: true
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Отключенное поле',
    placeholder: 'Недоступно',
    disabled: true
  }
}

export const Password: Story = {
  args: {
    modelValue: '',
    type: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
  },
};

export const Email: Story = {
  args: {
    modelValue: '',
    type: 'email',
    placeholder: 'example@mail.com',
    label: 'Email',
  },
};

export const Number: Story = {
  args: {
    modelValue: '',
    type: 'number',
    placeholder: 'Введите число',
    label: 'Числовое поле',
  },
}; 