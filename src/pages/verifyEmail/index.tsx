import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";

  // fetch verifikasi
  const { data, isLoading, error } = useQuery<VerifyEmailResponse, Error>({
    queryKey: ["verifyEmail", token],
    queryFn: async () => {
      const response = await axios.get<VerifyEmailResponse>(
        `/api/auth/verify-email?token=${token}`
      );
      return response.data;
    },
    enabled: !!token,
  });

  // setelah sukses redirect ke login
  useEffect(() => {
    if (data?.success) {
      const timer = setTimeout(() => router.push("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-6 rounded-x1 shadow"
      >
        {isLoading && <p className="text-center">🔄 Menunggu verifikasi…</p>}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p className="font-semibold">Verifikasi gagal</p>
            <p>{error.message}</p>
          </div>
        )}

        {data && data.success && (
          <div className="bg-green-100 text-green-700 p-4 rounded">
            <p className="font-semibold">✅ Email berhasil diverifikasi!</p>
            <p>{data.message}</p>
            <p className="mt-2 text-sm text-gray-600">
              Anda akan diarahkan ke halaman login
            </p>
          </div>
        )}

        {data && !data.success && (
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
            <p className="font-semibold">⚠️ Verifikasi tidak berhasil</p>
            <p>{data.message}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
