import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, UseDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { data } from "framer-motion/client";

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

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (data) => {
      const res = await axios.post<RegisterResponse>(
        "/api/auth/reigster",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setCredentials(data));
    },
    onError: (error: Error) => {
      console.error("Register failed:", error.message);
    },
  });
}
