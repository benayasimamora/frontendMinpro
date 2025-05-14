import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { showSuccess, showError } from "@/utils/toast";

type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
  referral_code?: string;
};

type RegisterResponse = {
  token: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    role: "CUSTOMER" | "ORGANIZER";
    referral_code?: string;
  };
};
export function useRegister() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: {
      full_name: string;
      email: string;
      password: string;
      referral_code?: string;
    }) => {
      const res = await axios.post<{ token: string; user: any }>(
        "/api/auth/register",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      showSuccess("Register Berhasil");
    },
    onError: (err: any) => {
      showError(err.response?.data?.message || "Register Gagal");
    },
  });
}
