import { useState } from "react";
import UserInfo from "./UserInfo";
import RewardsTab from "./RewardsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilPage() {
  const [tabValue, setTabValue] = useState<"info" | "rewards">("info");

  return (
    <div className="max-w-3x1 mx-auto p-6 space-y-6">
      <h1 className="text-3x1 font-bold">Profil Saya</h1>

      <Tabs
        value={tabValue}
        onValueChange={(value: string) =>
          setTabValue(value as "info" | "rewards")
        }
      >
        {/* Tab List: Info akun dan rewards */}
        <TabsList>
          <TabsTrigger value="info">Info Akun</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* Konten Tab: user info */}
        <TabsContent value="info">
          <UserInfo />
        </TabsContent>

        {/* Konten Tab: rewards */}
        <TabsContent value="rewards">
          <RewardsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
