"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, User, Palette } from "lucide-react";

export default function DashboardSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and preferences.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Profile</h2>
            <p className="text-sm text-slate-400">Update your personal information.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Display Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Email</label>
            <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl" />
          </div>
        </div>
        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium btn-lift">
          Save Changes
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            <p className="text-sm text-slate-400">Configure alert preferences.</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Email notifications for new reports", defaultChecked: true },
            { label: "Alert on high-severity findings", defaultChecked: true },
            { label: "Weekly summary digest", defaultChecked: false },
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors">
              <input type="checkbox" defaultChecked={item.defaultChecked} className="w-5 h-5 rounded accent-blue-600" />
              <span className="text-sm text-slate-300">{item.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Security</h2>
            <p className="text-sm text-slate-400">Manage password and 2FA.</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Current Password</label>
            <input type="password" placeholder="Enter current password" className="w-full px-4 py-3 rounded-xl" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">New Password</label>
            <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 rounded-xl" />
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium btn-lift">
            Update Password
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
            <p className="text-sm text-slate-400">Customize the interface.</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Compact mode", defaultChecked: false },
            { label: "Show confidence scores by default", defaultChecked: true },
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors">
              <input type="checkbox" defaultChecked={item.defaultChecked} className="w-5 h-5 rounded accent-blue-600" />
              <span className="text-sm text-slate-300">{item.label}</span>
            </label>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
