import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "username minimal 3 karakter")
    .max(16, "username tidak boleh lebih dari 16"),
    password: z.string().min(6,"password minimal 6 karakter").max(16, "password maksimal 16 karakter")
});
