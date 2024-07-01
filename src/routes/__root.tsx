import Navigation from '@/components/Navigation';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-wrap gap-7">
        <Navigation />
        <div className="flex-1 p-7">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
