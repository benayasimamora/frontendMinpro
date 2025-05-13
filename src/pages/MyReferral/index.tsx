"use client";

import { useMyReferral } from "@/hooks/useMyReferral";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import Loader from "@/components/loader";
import { format } from "date-fns";

export default function MyReferralPage() {
  const { data, isLoading, isError, refetch } = useMyReferral();

  if (isLoading) return <Loader message="Memuat data referral..." />;

  if (isError)
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">Gagal memuat data referral.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Coba lagi
        </button>
      </div>
    );

  return (
    <div className="p-6 max-w-4x1 mx-auto space-y-4">
      <h1 className="text-2xl font-bold">My Referral</h1>

      {data && data.length === 0 && (
        <p className="text-gray-600">Belum ada referral yang Anda berikan</p>
      )}

      {data && data.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Email referee</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Poin</TableCell>
              <TableCell>Kupon</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.referee_email}</TableCell>
                <TableCell>
                  {format(new Date(item.date || ""), "dd MM YYYY")}
                </TableCell>
                <TableCell>{item.points_awarded}</TableCell>
                <TableCell>{item.coupon_code}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
