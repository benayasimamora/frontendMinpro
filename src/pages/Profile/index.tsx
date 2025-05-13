"use client";

import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "@/schema/profile";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";

type FormValues = {
  full_name: string;
  profilePictureFile?: FileList;
};

export default function ProfilePage() {
  const { data: user, isLoading: loadingProfile } = useUserProfile();
  const updateMut = useUpdateProfile();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { full_name: "", profilePictureFile: undefined },
  });

  // saat data datang, set default form
  useEffect(() => {
    if (user) reset({ full_name: user.full_name });
  }, [user, reset]);

  if (loadingProfile) return <Loader message="Memuat profil..." />;

  const onSubmit = (vals: FormValues) => {
    const formData = new FormData();
    formData.append("full_name", vals.full_name);
    if (vals.profilePictureFile?.[0]) {
      formData.append("profilePictureFile", vals.profilePictureFile[0]);
    }
    updateMut.mutate(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profil Saya</h1>

      {/* Avatar Preview */}
      <div className="flex items-center space-x-4">
        <Avatar>
          {user?.profile_picture ? (
            <img src={user.profile_picture} alt={user.full_name || "Avatar"} />
          ) : (
            <span>{user?.full_name?.charAt(0) || "?"}</span>
          )}
        </Avatar>
        <span className="text-lg">{user?.email}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium">Nama Lengkap</label>
              <Input {...field} />
              {errors.full_name && (
                <p className="text-red-500 text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Profile Picture */}
        <Controller
          name="profilePictureFile"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium">
                Foto Profil (JPG ≤ 500KB)
              </label>
              <input
                type="file"
                accept="image/jpeg"
                onChange={(e) => field.onChange(e.target.files)}
                className="mt-1"
              />
              {errors.profilePictureFile && (
                <p className="text-red-500 text-sm">
                  {errors.profilePictureFile.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>

      {/* API Error */}
      {updateMut.isError && (
        <p className="text-red-600">{(updateMut.error as Error).message}</p>
      )}
      {updateMut.isSuccess && (
        <p className="text-green-600">Profil berhasil diperbarui</p>
      )}
    </div>
  );
}
