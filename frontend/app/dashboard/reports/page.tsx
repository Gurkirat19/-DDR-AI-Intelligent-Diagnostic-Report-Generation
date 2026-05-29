"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Calendar, AlertTriangle } from "lucide-react";
import { getJson } from "@/lib/api";

type ReportItem = {
  id: number;
  title: string;
  source_file: string;
  created_at: string;
  analysis?: any;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function DashboardReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getJson<ReportItem[]>("/reports");
        setReports(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message || "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-slate-400 mt-1">All your generated diagnostic reports.</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold btn-lift"
        >
          New Upload
        </Link>
      </motion.div>

      {loading ? (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full spinner mx-auto" />
          <p className="text-slate-300 mt-4">Loading reports...</p>
          <p className="text-slate-500 text-sm">Fetching your recent uploads and analyses.</p>
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-12 text-center space-y-3">
          <p className="text-slate-300 font-medium">{error}</p>
          <p className="text-slate-500 text-sm">Please retry or upload a new report.</p>
        </div>
      ) : reports.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-16 text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto">
            <FileText className="w-10 h-10 text-slate-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">No reports yet</h3>
            <p className="text-slate-400 mt-2 max-w-md mx-auto">
              Upload your first inspection PDF to generate an AI-powered diagnostic report.
            </p>
          </div>
          <Link
            href="/dashboard/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold btn-lift"
          >
            Upload Report <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {reports.map((r) => (
            <motion.div
              key={r.id}
              variants={fadeInUp}
            >
              <Link
                href={`/dashboard/reports/${r.id}`}
                className="group flex items-center gap-5 p-5 glass rounded-2xl card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                    <span className="truncate max-w-[200px]">
                      {r.source_file ? r.source_file.split("/").pop() : "No file"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {r.analysis?.observations?.length > 0 && (
                    <span className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                      <AlertTriangle className="w-3 h-3" />
                      {r.analysis.observations.length} findings
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
