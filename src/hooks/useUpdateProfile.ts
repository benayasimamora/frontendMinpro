import { UserProfile } from "@/interface/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateProfile() {
  const qc = useQueryClient();

  return useMutation<UserProfile, Error, FormData>({
    mutationFn: async (formData) =>
      axios
        .put<{ data: UserProfile }>("?api/profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["UserProfile"] });
    },
  });
}
