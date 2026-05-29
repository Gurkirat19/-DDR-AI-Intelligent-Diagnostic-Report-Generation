"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileUp, AlertCircle } from "lucide-react";
import { uploadFile } from "@/lib/api";
import { formatFileSize } from "@/lib/format";

export default function DashboardUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setStatus("Uploading file...");
    const form = new FormData();
    form.append("file", file);
    try {
      const progressTimer = setTimeout(() => setStatus("Running AI analysis..."), 600);
      const data = await uploadFile(form);
      clearTimeout(progressTimer);
      if (data?.report_id) {
        setStatus(`Analysis complete! Redirecting...`);
        setTimeout(() => router.push(`/dashboard/reports/${data.report_id}`), 800);
      } else {
        setStatus("Upload finished without a report id.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus(err?.message || "Upload failed. Check connection to backend.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">Upload Report</h1>
        <p className="text-slate-400 mt-1">Upload an inspection or thermal PDF for AI analysis.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8"
      >
        <form onSubmit={onSubmit} className="space-y-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-500/5"
                : "border-slate-700 hover:border-slate-600"
            }`}
          >
            <input
              type="file"
              accept="application/pdf,image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="space-y-3 pointer-events-none">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto">
                <FileUp className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-white">
                  {file ? file.name : "Drag & drop or click to browse"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {file ? formatFileSize(file.size) : "PDFs preferred. Max 50MB."}
                </p>
              </div>
            </div>
          </div>

          {file && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="text-sm text-blue-300">
                Ready to analyze <strong>{file.name}</strong>. Click Upload & Analyze to proceed.
              </div>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg btn-lift flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload & Analyze
              </>
            )}
          </button>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-slate-300"
            >
              {status}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
