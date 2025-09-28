import { Toaster } from "@/components/ui/sonner";
import {
  ErrorComponent,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorComponent,
  notFoundComponent: () => <div>Not found!</div>,

  component: () => (
    <>
      <Outlet />
      <Toaster />
      {import.meta.env.VITE_ENV === "dev" && (
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </>
  ),
});
