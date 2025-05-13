"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token, router]);

    if (!token) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return AuthComponent;
}
