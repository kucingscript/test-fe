import {
  ErrorComponent,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorComponent,
  notFoundComponent: () => <div>Not found!</div>,

  component: () => (
    <>
      <Outlet />
      {import.meta.env.VITE_ENV === "dev" && (
        <TanstackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </>
  ),
});
