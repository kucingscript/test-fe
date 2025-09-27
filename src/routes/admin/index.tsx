import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate({ from: "/admin" });

  const handleLogout = () => {
    logout();
    navigate({ to: "/login", search: { redirect: undefined } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.nickname}!</h1>
      <p>This is a protected admin page.</p>
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">User Details:</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <Button onClick={handleLogout} className="mt-6">
        Logout
      </Button>
    </div>
  );
}
