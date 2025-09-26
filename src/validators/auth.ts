import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .max(50, "Email is too long")
    .required("Email is required"),
  password: yup
    .string()
    .max(100, "Password is too long")
    .required("Password is required"),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;
