import { AppProps } from 'next/app';
import globalStyles from '../styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { StoreProvider } from '../store';
import { CookiesProvider } from 'react-cookie';
import { HydrationProvider } from 'react-hydration-provider';
import { COLORS, theme } from '../styles/stitches.config';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { ConfigProvider } from 'antd';
import qs from 'qs';

const antdTheme: ConfigProviderProps['theme'] = {
  token: {
    colorPrimary: COLORS.primary,
    colorLinkHover: COLORS.primary,
  },
};

console.log(theme.colors.primary.toString());

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
});

axios.defaults.withCredentials = true;
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, { indices: false }); // param=value1&param=value2
};

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <HydrationProvider>
      <CookiesProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={antdTheme}>
              <Component {...pageProps} />
            </ConfigProvider>
          </QueryClientProvider>
        </StoreProvider>
      </CookiesProvider>
    </HydrationProvider>
  );
}

export default MyApp;
