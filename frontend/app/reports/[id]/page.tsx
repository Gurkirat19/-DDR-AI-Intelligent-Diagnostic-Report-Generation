"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ReportDetailRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      router.replace(`/dashboard/reports/${id}`);
    }
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full spinner" />
    </div>
  );
}
