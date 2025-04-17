import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],

  args: {
    id: 1,
    name: '',
    imageUrl: 'https://example.com/image.jpg',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Card: Story = {
  args: {
    id: 1,
    name: 'pikachu',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
};
