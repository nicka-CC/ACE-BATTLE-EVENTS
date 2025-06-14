import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';

import Button from './Button.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['icon' , 'form' , 'form-gray' , 'pagination'] },
    backgroundColor: { control: 'color' },
  },

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Icon: Story = {
  args: {
    label: 'B',
    type: 'icon',
  },
};

export const Form: Story = {
  args: {
    label: 'Button',
    type: 'form',
  },
};
export const FormGray: Story = {
  args: {
    label: 'Button',
    type: 'form-gray',
  },
};
export const Pagination: Story = {
  args: {
    label: 'B',
    type: 'pagination',
  },
};
