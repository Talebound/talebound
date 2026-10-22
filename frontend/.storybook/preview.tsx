import React, { ComponentType } from 'react';
import globalStyles from '../styles/globalStyles';
import { StoreProvider } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Preview } from '@storybook/nextjs';
import { CookiesProvider } from 'react-cookie';

type StorybookDecorator = (Story: ComponentType) => React.JSX.Element;

const queryClient = new QueryClient();

export const decorators: StorybookDecorator[] = [
  (Story: ComponentType): React.JSX.Element => {
    globalStyles();

    return (
      <CookiesProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </StoreProvider>
      </CookiesProvider>
    );
  },
];

// Storybook evaluates this comparator as JavaScript when generating its index.
// Contextual typing keeps TypeScript annotations out of the function itself.
type SortedPreview = Preview & {
  parameters: {
    options: { storySort: (a: { id: string }, b: { id: string }) => number };
  };
};

const preview: SortedPreview = {
  parameters: {
    options: {
      storySort: (a, b) =>
        a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  },
};

export default preview;
