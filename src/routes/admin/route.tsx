import AppSidebar from "@/components/Appsidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { isTokenValid } from "@/lib/token";
import { useAuthStore } from "@/store/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const { token, logout } = useAuthStore.getState();

    if (!isTokenValid(token)) {
      logout();
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

async function RouteComponent() {
  const defaultOpen = Cookies.get("sidebar_state") === "true";

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <div className="px-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
