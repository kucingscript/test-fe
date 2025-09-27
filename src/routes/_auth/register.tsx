import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/authService";
import { registerSchema, type RegisterSchema } from "@/validators/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const navigate = useNavigate({ from: "/register" });
  const methods = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await registerUser({ ...data, corporate_type_id: "2" });
      if (res && res.code === 0) {
        toast.success("Registration successful! Please log in.");
        navigate({
          to: "/login",
          search: { redirect: undefined },
          replace: true,
        });
      } else {
        setError("root", {
          message: res.message || "Registration failed. Please try again.",
        });
      }
    } catch (error: any) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response) {
        if (error.response.status === 500) {
          errorMessage = "Failed to create account. Email already in use.";
        }
      }

      setError("root", { message: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
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
              required
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              required
            />
            <FormInput
              name="nickname"
              type="text"
              placeholder="Nickname"
              label="Nickname"
              required
            />
            <FormInput
              name="fullname"
              type="text"
              placeholder="Full Name"
              label="Full Name"
              required
            />
            <FormInput
              name="corporate_name"
              type="text"
              placeholder="Corporate Name"
              label="Corporate Name"
              required
            />
            <FormInput
              name="corporate_code"
              type="text"
              placeholder="Corporate Code"
              label="Corporate Code"
              required
            />
            <FormInput
              name="corporate_address"
              type="textarea"
              placeholder="Corporate Address"
              label="Corporate Address"
              required
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </FormProvider>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            search={{ redirect: undefined }}
            className="text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
