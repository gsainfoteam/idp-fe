import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';

import { TokenProvider } from '@/features/auth';
import { LanguageSwitcher } from '@/features/core';

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <div className="relative min-h-screen">
          <Outlet />
          <div className="absolute right-4 bottom-4">
            <LanguageSwitcher />
          </div>
        </div>
      </TokenProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
