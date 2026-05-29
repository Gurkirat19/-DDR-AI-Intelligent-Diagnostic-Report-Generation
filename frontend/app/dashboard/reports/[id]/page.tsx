"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileJson,
  FileSpreadsheet,
  FileText,
  AlertTriangle,
  Thermometer,
  Lightbulb,
  Info,
  Shield,
} from "lucide-react";
import { getJson, apiBase } from "@/lib/api";

type ReportDetail = {
  id: number;
  title: string;
  source_file: string;
  content_text?: string;
  created_at: string;
  observations: any[];
  thermal_findings: any[];
  recommendations: any[];
  images: any[];
  ddr_reports: any[];
};

function SeverityBadge({ severity }: { severity?: number }) {
  if (severity == null) return <span className="text-slate-500 text-xs bg-slate-800 px-2 py-1 rounded-full">N/A</span>;
  const config =
    severity >= 7
      ? { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/30", label: "High" }
      : severity >= 4
      ? { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30", label: "Medium" }
      : { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30", label: "Low" };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      {config.label} · {severity}/10
    </span>
  );
}

function PriorityBadge({ priority }: { priority?: string }) {
  if (!priority) return null;
  const config =
    priority === "high"
      ? { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/30" }
      : priority === "medium"
      ? { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" }
      : { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${config.bg} ${config.text} ${config.border}`}>
      {priority}
    </span>
  );
}

export default function DashboardReportDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await getJson<ReportDetail>(`/reports/${id}`);
        setReport(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load report.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center py-20">
        <div className="glass rounded-2xl p-10 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full spinner mx-auto" />
          <p className="text-slate-300">Loading report...</p>
          <p className="text-slate-500 text-sm">Fetching findings, thermal data, and exports.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-20">
        <div className="glass rounded-2xl p-10 text-center space-y-3">
          <p className="text-slate-200 font-semibold">{error}</p>
          <p className="text-slate-500 text-sm">Please retry or return to Reports.</p>
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold btn-lift"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto">
          <Info className="w-10 h-10 text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Report not found</h2>
          <p className="text-slate-400 mt-2">The report you are looking for does not exist.</p>
        </div>
        <Link
          href="/dashboard/reports"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold btn-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </Link>
      </div>
    );
  }

  const ddr = report.ddr_reports?.[0];
  const sections = ddr?.sections || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-start justify-between gap-4"
      >
        <div>
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to reports
          </Link>
          <h1 className="text-3xl font-bold text-white">{report.title}</h1>
          <p className="text-sm text-slate-400 mt-1">
            Report #{report.id} · {new Date(report.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <a
            href={`${apiBase}/export/json/${report.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FileJson className="w-4 h-4" />
            JSON
          </a>
          <a
            href={`${apiBase}/export/pdf/${report.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FileText className="w-4 h-4" />
            PDF
          </a>
          <a
            href={`${apiBase}/export/excel/${report.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </a>
        </div>
      </motion.div>

      {/* Executive Summary */}
      {sections.executive_summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Executive Summary</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">{sections.executive_summary}</p>
        </motion.div>
      )}

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { icon: AlertTriangle, label: "Observations", count: report.observations?.length || 0, color: "text-amber-400", bg: "from-amber-500/10 to-amber-600/5" },
          { icon: Thermometer, label: "Thermal", count: report.thermal_findings?.length || 0, color: "text-red-400", bg: "from-red-500/10 to-red-600/5" },
          { icon: Lightbulb, label: "Recommendations", count: report.recommendations?.length || 0, color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/5" },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-5 text-center">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{stat.count}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Observations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">Observations</h2>
          <span className="ml-auto text-sm text-slate-500">{report.observations?.length || 0} total</span>
        </div>
        {report.observations?.length ? (
          <div className="space-y-3">
            {report.observations.map((o: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{o.category || "Observation"}</span>
                    {o.area && <span className="text-xs text-slate-500">· {o.area}</span>}
                  </div>
                  <SeverityBadge severity={o.severity} />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{o.description}</p>
                <div className="flex gap-4 mt-3 text-xs text-slate-500">
                  {o.risk && <span>Risk: <span className="text-slate-400 capitalize">{o.risk}</span></span>}
                  {o.confidence != null && <span>Confidence: <span className="text-slate-400">{(o.confidence * 100).toFixed(0)}%</span></span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No observations recorded.</p>
        )}
      </motion.div>

      {/* Thermal Findings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Thermometer className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-semibold text-white">Thermal Findings</h2>
          <span className="ml-auto text-sm text-slate-500">{report.thermal_findings?.length || 0} total</span>
        </div>
        {report.thermal_findings?.length ? (
          <div className="space-y-3">
            {report.thermal_findings.map((t: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-medium text-white">{t.area || "Thermal Finding"}</span>
                  <SeverityBadge severity={t.severity} />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{t.description}</p>
                {t.temperature != null && (
                  <div className="mt-2 text-xs text-slate-500">
                    Temperature: <span className="text-red-300">{t.temperature}°C</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No thermal findings recorded.</p>
        )}
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Recommendations</h2>
          <span className="ml-auto text-sm text-slate-500">{report.recommendations?.length || 0} total</span>
        </div>
        {report.recommendations?.length ? (
          <div className="space-y-3">
            {report.recommendations.map((rec: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-medium text-white">{rec.title}</span>
                  <PriorityBadge priority={rec.priority} />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No recommendations recorded.</p>
        )}
      </motion.div>

      {/* Missing Information */}
      {sections.missing_information?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl font-semibold text-white">Missing Information</h2>
          </div>
          <ul className="space-y-2">
            {sections.missing_information.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Confidence Scores */}
      {sections.confidence_scores && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">Confidence Scores</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(sections.confidence_scores).map(([key, val]: [string, any]) => (
              <div key={key} className="p-4 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-slate-500 capitalize mb-1">{key}</p>
                <p className="text-2xl font-bold text-white">{(val * 100).toFixed(0)}%</p>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${val * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
