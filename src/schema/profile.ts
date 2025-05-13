import { z } from "zod";

export const UpdateProfileSchema = z.object({
  full_name: z.string().min(3, "Nama minimal 3 karakter"),
  profilePictureFile: z
    .instanceof(FileList)
    .refine(
      (files) =>
        !files.length ||
        (files[0].size <= 500_000 && files[0].type === "image/jpeg"),
      "File harus JPG dan ≤ 500KB"
    )
    .optional(),
});
