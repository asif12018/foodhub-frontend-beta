"use client";

import { toast } from "sonner";
import { authClient } from "@/src/app/lib/auth-client";
import ProfileIcon from "./profileDropDown";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardProfile() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { data: sessionData, isPending: loading } = authClient.useSession();
  
  const handleLogout = async () => {
    setIsPending(true);
    const toastId = toast("Signing out....");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully", { id: toastId });
            window.location.reload();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Something went wrong", {
              id: toastId,
            });
          },
        },
      });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex items-center gap-4">
      {sessionData?.session ? (
        <ProfileIcon
          userData={sessionData?.user}
          sessionData={sessionData}
          onLogout={handleLogout}
          isLoggingOut={isPending}
        />
      ) : null}
    </div>
  );
}
