import '@mantine/core/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell, ColorSchemeScript, MantineProvider } from '@mantine/core';
import { AppHeader } from './components/AppHeader/AppHeader';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { TransactionsPage } from './pages/Transactions.page';
import { theme } from './theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark">
          <BrowserRouter>
            <TransactionsProvider>
              <AppShell header={{ height: 60, collapsed: false }} padding="md">
                <AppShell.Header withBorder>
                  <AppHeader />
                </AppShell.Header>

                <AppShell.Main pt={60}>
                  <Routes>
                    <Route path="/" element={<TransactionsPage />} />
                  </Routes>
                </AppShell.Main>
              </AppShell>
            </TransactionsProvider>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
