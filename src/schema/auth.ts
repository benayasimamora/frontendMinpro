import { z } from "zod";

export const RegisterSchema = z.object({
  full_name: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  referral_code: z
    .string()
    .regex(/^[A-Za-z0-9]{6,10}$/, "Kode harus 6-10 karakter alfanumerik")
    .optional(),
});
