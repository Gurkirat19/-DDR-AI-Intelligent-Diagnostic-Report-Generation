"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  TrendingUp,
  Shield,
  Thermometer,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Overview of your inspection reports and activity.</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold btn-lift"
        >
          <Upload className="w-5 h-5" />
          New Upload
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: FileText, label: "Total Reports", value: "12", change: "+2 this week", color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/5" },
          { icon: Thermometer, label: "Thermal Findings", value: "48", change: "+8 analyzed", color: "text-amber-400", bg: "from-amber-500/10 to-amber-600/5" },
          { icon: Shield, label: "Avg Risk Score", value: "6.2", change: "Medium", color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-600/5" },
          { icon: TrendingUp, label: "Processing", value: "99%", change: "Uptime", color: "text-purple-400", bg: "from-purple-500/10 to-purple-600/5" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="glass rounded-2xl p-6 card-hover"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bg} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/upload"
            className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all card-hover"
          >
            <Upload className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-1">Upload Report</h3>
            <p className="text-sm text-slate-400 mb-3">Analyze a new inspection PDF</p>
            <span className="text-sm text-blue-400 flex items-center gap-1">
              Get started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/dashboard/reports"
            className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all card-hover"
          >
            <FileText className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-1">View Reports</h3>
            <p className="text-sm text-slate-400 mb-3">Browse your generated DDRs</p>
            <span className="text-sm text-purple-400 flex items-center gap-1">
              Browse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <div className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all card-hover cursor-pointer">
            <TrendingUp className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-1">Analytics</h3>
            <p className="text-sm text-slate-400 mb-3">Track trends over time</p>
            <span className="text-sm text-emerald-400 flex items-center gap-1">
              Coming soon <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Report generated", detail: "Building Inspection #2405", time: "2 hours ago", icon: FileText, color: "text-blue-400" },
            { action: "Upload processed", detail: "thermal_audit_q2.pdf", time: "5 hours ago", icon: Upload, color: "text-amber-400" },
            { action: "Analysis complete", detail: "Roof inspection report", time: "1 day ago", icon: Shield, color: "text-emerald-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{item.action}</div>
                <div className="text-xs text-slate-400">{item.detail}</div>
              </div>
              <div className="text-xs text-slate-500">{item.time}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
