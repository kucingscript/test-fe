import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .max(50, "Email is too long")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .required("Password is required"),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .max(50, "Email is too long")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is too long")
    .required("Password is required"),
  nickname: yup
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname is too long"),
  fullname: yup
    .string()
    .min(3, "Fullname must be at least 3 characters")
    .max(50, "Fullname is too long")
    .required("Fullname is required"),
  corporate_name: yup
    .string()
    .min(3, "Corporate name must be at least 3 characters")
    .max(100, "Corporate name is too long")
    .required("Corporate name is required"),
  corporate_code: yup
    .string()
    .max(10, "Maximum 10 characters")
    .required("Corporate code is required"),
  corporate_address: yup
    .string()
    .max(100, "Corporate address is too long")
    .required("Corporate address is required"),
  corporate_type_id: yup
    .string()
    .max(50, "Corporate type is too long")
    .required("Corporate type is required"),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
