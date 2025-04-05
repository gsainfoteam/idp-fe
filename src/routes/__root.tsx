import { Outlet, createRootRoute } from '@tanstack/react-router';

import { LanguageSwitcher } from '../locales/language-switcher';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="relative min-h-screen">
      <Outlet />
      <div className="absolute right-4 bottom-4">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
