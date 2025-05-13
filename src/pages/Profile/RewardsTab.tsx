"use client";

import { useState } from "react";
import { useRewards } from "@/hooks/useRewards";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/loader";
import format from "date-fns/format";

export default function RewardsTab() {
  const { data, isLoading, isError, refetch } = useRewards();
  const [subTab, setSubTab] = useState<"points" | "coupons">("points");

  if (isLoading) return <Loader message="Memuat rewards..." />;
  if (isError)
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Gagal memuat reward.</p>
        <button onClick={() => refetch()} className="mt-2 btn-primary">
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <Tabs
        value={subTab}
        onValueChange={(value) => setSubTab(value as "points" | "coupons")}
      >
        <TabsList>
          <TabsTrigger value="points">Points</TabsTrigger>
          <TabsTrigger value="coupons">Kupon</TabsTrigger>
        </TabsList>

        <TabsContent value="points">
          {data?.point.length ? (
            <div className="space-y-2">
              {data.point.map((pr) => (
                <div
                  key={pr.id}
                  className="p-4 bg-white shadow rounded flex justify-between"
                >
                  <div>
                    <p className="font-medium">Poin: {pr.amount}</p>
                    <p className="text-sm text-gray-500">
                      Kadaluwarsa:{" "}
                      {format(new Date(pr.expired_at), "dd MM YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Belum ada poin.</p>
          )}
        </TabsContent>

        <TabsContent value="coupons">
          {data?.coupons.length ? (
            <div className="space-y-2">
              {data.coupons.map((cr) => (
                <div
                  key={cr.id}
                  className="p-4 bg-white shadow rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Kode: {cr.code}</p>
                    <p className="text-sm text-gray-500">
                      Kadaluwarsa:{" "}
                      {format(new Date(cr.expired_at), "dd MM YYYY")}
                    </p>
                    <p className="text-sm">Status: {cr.status}</p>
                  </div>
                  {cr.status === "AVAILABLE" && (
                    <button className="px-3 py-1 bg-green-500 text-white rounded">
                      Redeem
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Belum ada kupon.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
