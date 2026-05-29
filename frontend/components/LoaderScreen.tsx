"use client";

import { motion } from "framer-motion";
import { Shield, Loader2 } from "lucide-react";

type LoaderScreenProps = {
  message?: string;
  subtext?: string;
};

export function LoaderScreen({ message = "Loading", subtext }: LoaderScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 gradient-overlay" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative glass-strong px-8 py-10 rounded-3xl text-center space-y-4 shadow-2xl"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center justify-center gap-2 text-white text-lg font-semibold">
          <Loader2 className="w-5 h-5 animate-spin" />
          {message}
        </div>
        {subtext && <p className="text-sm text-slate-300">{subtext}</p>}
      </motion.div>
    </div>
  );
}
