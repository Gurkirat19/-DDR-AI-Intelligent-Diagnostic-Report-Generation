"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/upload");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full spinner" />
    </div>
  );
}
