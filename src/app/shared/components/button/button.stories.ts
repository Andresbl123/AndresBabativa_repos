import { ButtonComponent } from '@/shared/components/button/button.component';
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],

  args: {
    onClick: fn(),
    label: 'button',
    variant: 'primary',
    disabled: false,
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
};
