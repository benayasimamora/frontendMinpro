import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Reward } from "@/interface/rewards";

export function useRewards() {
  return useQuery<Reward, Error>({
    queryKey: ["rewards"],
    queryFn: async () => {
      const res = await axios.get<{ data: Reward }>("/api/profile/rewards");
      return res.data.data;
    },
    staleTime: 5 * 60_000,
  });
}
