import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 3,
      refetchOnWindowFocus: true
    }
  }
});

export const QueryProvider = ({children}: {children: React.ReactNode}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
