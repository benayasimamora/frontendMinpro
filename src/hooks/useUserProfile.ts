import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserProfile } from "@/interface/user";

export function useUserProfile() {
  return useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axios.get<{ data: UserProfile }>("/api/profile");
      return response.data.data;
    },
    staleTime: 5 * 60_000,
  });
}
