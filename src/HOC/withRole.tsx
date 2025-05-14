"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function withRole<P extends object>(roles: string[]) {
  return (WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => {
      const router = useRouter();
      const { role } = useSelector(
        (s: RootState) => (s.auth.user as { role: string }) || {}
      );

      useEffect(() => {
        if (!role) return;
        if (!roles.includes(role)) {
          router.replace("/403");
        }
      }, [role, router]);

      if (!role || !roles.includes(role)) {
        return null;
      }
      return <WrappedComponent {...props} />;
    };
  };
}
