import type { Meta, StoryObj } from '@storybook/vue3';
import Checkbox from './Checkbox.vue';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    label: 'Согласен с условиями',
  },
};

export const Checked: Story = {
  args: {
    modelValue: true,
    label: 'Согласен с условиями',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: false,
    label: 'Согласен с условиями',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    label: 'Согласен с условиями',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    modelValue: false,
  },
}; 