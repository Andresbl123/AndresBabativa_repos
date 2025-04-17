import type { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';
import { fn } from '@storybook/test';

const meta: Meta<SearchBarComponent> = {
  title: 'Components/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  argTypes: {
    searchTerm: {
      action: 'searchTerm',
      description: 'Event emitted when search term changes after debounce',
    },
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = {
  args: {
    searchTerm: fn(),
  },
  render: (args) => ({
    props: args,
    template: `
      <app-search-bar 
        (searchTerm)="searchTerm($event)"
      ></app-search-bar>
    `,
  }),
};
