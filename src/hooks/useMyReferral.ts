import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyReferralItem } from "@/interface/referral";

export function useMyReferral() {
  return useQuery<MyReferralItem[], Error>({
    queryKey: ["myReferral"],
    queryFn: async () => {
      const res = await axios.get<{ data: MyReferralItem[] }>(
        "/api/referral/me"
      );
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
