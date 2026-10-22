import React, { ComponentType } from 'react';
import globalStyles from '../styles/globalStyles';
import { StoreProvider } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Preview } from '@storybook/react';

type StorybookDecorator = (Story: ComponentType) => React.JSX.Element;

const queryClient = new QueryClient();

export const decorators: StorybookDecorator[] = [
  // eslint-disable-next-line @typescript-eslint/naming-convention
  (Story: ComponentType): React.JSX.Element => {
    globalStyles();

    return (
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </StoreProvider>
    );
  },
];

const preview: Preview = {
  parameters: {
    options: {
      // @ts-ignore
      storySort: (a, b) =>
        a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  },
};

export default preview;
