import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginSchema } from "@/validators/auth";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import FormInput from "@/components/FormInput";
import { Loader2 } from "lucide-react";
import { loginUser } from "@/services/authService";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (search) => {
    if (search.redirect && typeof search.redirect !== "string") {
      throw new Error("Invalid redirect param");
    }
    return {
      redirect:
        typeof search.redirect === "string" ? search.redirect : undefined,
    };
  },
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate({ from: "/login" });
  const { redirect } = useSearch({ from: Route.id });

  const methods = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const { login } = useAuthStore();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await loginUser(data);
      if (res && res.code === 0) {
        toast.success("Login successful!");
        login(res.data);
        navigate({
          to: redirect || "/admin",
          search: { redirect: undefined },
          replace: true,
        });
      } else {
        setError("root", {
          message: res.message || "Login failed. Please try again.",
        });
      }
    } catch (error: any) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password.";
        }
      }

      setError("root", { message: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded-md">
                {errors.root.message}
              </div>
            )}

            <FormInput
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </FormProvider>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
