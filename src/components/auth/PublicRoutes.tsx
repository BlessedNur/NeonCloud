// components/auth/PublicRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCloudContext } from "../../context/Context";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useCloudContext();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router, isAuthenticated]);

  // Show nothing if authenticated
  if (isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
