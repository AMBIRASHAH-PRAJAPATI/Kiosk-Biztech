import { z } from "zod";

// Creating Object Schema
const loginSchema = z.object({
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(20, { message: "Phone number must not exceed 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least 7 characters" })
    .max(1024, { message: "Password must not exceed 1024 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must not exceed 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not exceed 255 characters" }),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Passwords do not match",
    }),
});

const categorySchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
});

export { signupSchema, loginSchema, categorySchema };
