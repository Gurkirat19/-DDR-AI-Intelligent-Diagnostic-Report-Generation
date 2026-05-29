"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Zap,
  BarChart3,
  Shield,
  Thermometer,
  Brain,
  Download,
  CheckCircle2,
  Users,
  Building2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  TrendingUp,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-extrabold leading-tight"
            >
              Transform Inspections into
              <br />
              <span className="gradient-text">Actionable Intelligence</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              DDR AI automatically analyzes property and thermal inspection reports,
              extracting critical findings, assessing risks, and generating
              structured diagnostic reports in seconds.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton strength={20}>
                <Link
                  href="/login"
                  className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg btn-lift flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={20}>
                <a
                  href="#about"
                  className="px-8 py-4 rounded-2xl glass text-slate-300 font-medium hover:text-white transition-colors block"
                >
                  Learn More
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
            >
              {[
                { value: "10x", label: "Faster Analysis" },
                { value: "99%", label: "Accuracy Rate" },
                { value: "500+", label: "Reports Generated" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero visual with 3D Parallax Tilt */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <TiltCard className="max-w-5xl mx-auto">
              <div className="glass-strong rounded-3xl p-2">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 space-y-6 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="text-xs text-slate-500">Diagnostic Report Preview</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <Thermometer className="w-4 h-4 text-teal" />
                        <span className="text-sm font-medium text-slate-300">Thermal Findings</span>
                      </div>
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-xs text-slate-500 mt-1">3 critical anomalies</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-slate-300">Risk Score</span>
                      </div>
                      <div className="text-2xl font-bold text-amber-400">6.8<span className="text-sm text-slate-500">/10</span></div>
                      <div className="text-xs text-slate-500 mt-1">Medium risk level</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-slate-300">Recommendations</span>
                      </div>
                      <div className="text-2xl font-bold text-white">8</div>
                      <div className="text-xs text-slate-500 mt-1">4 high priority</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="h-2 bg-white/10 rounded-full w-full" />
                    <div className="h-2 bg-white/10 rounded-full w-4/5" />
                    <div className="h-2 bg-white/10 rounded-full w-3/5" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300">
                <Users className="w-4 h-4" />
                About DDR AI
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Built for <span className="gradient-text"> inspectors</span>, powered by AI
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                DDR AI revolutionizes the way property and thermal inspection reports are processed.
                Our platform uses advanced artificial intelligence to read, understand, and structure
                complex inspection data into clear, actionable diagnostic reports.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Whether you are a building inspector, facility manager, or property owner,
                DDR AI helps you identify critical issues faster, assess risks accurately,
                and make informed decisions with confidence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {["PDF Parsing", "Thermal Analysis", "Risk Scoring", "Export Reports"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full glass text-sm text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="relative">
              <div className="glass-strong rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">Property Inspection</div>
                    <div className="text-sm text-slate-400">Complete structural analysis</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Structural Integrity", value: 92, color: "bg-emerald-500" },
                    { label: "Thermal Efficiency", value: 78, color: "bg-blue-500" },
                    { label: "Electrical Safety", value: 85, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="text-slate-400">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center space-y-4 mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-teal-300">
              <Zap className="w-4 h-4" />
              Features
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
              Everything you need for <span className="gradient-text">smart inspections</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              From document parsing to AI-powered analysis and report generation,
              DDR AI streamlines your entire inspection workflow.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: FileText,
                title: "Document Parsing",
                description: "Automatically extract text and images from PDF inspection reports with high accuracy.",
                color: "text-teal",
                bg: "from-teal-500/20 to-teal-600/5",
              },
              {
                icon: Brain,
                title: "AI Analysis",
                description: "GPT-4 powered extraction of observations, thermal anomalies, and root causes.",
                color: "text-blue-400",
                bg: "from-blue-500/20 to-blue-600/5",
              },
              {
                icon: Thermometer,
                title: "Thermal Imaging",
                description: "Detect and classify thermal anomalies with temperature readings and severity scores.",
                color: "text-amber-400",
                bg: "from-amber-500/20 to-amber-600/5",
              },
              {
                icon: BarChart3,
                title: "Risk Scoring",
                description: "Comprehensive severity and risk assessment across safety, structural, and operational dimensions.",
                color: "text-purple-400",
                bg: "from-purple-500/20 to-purple-600/5",
              },
              {
                icon: Download,
                title: "Multi-Format Export",
                description: "Export reports as PDF, Excel, or JSON for seamless integration with your workflow.",
                color: "text-emerald-400",
                bg: "from-emerald-500/20 to-emerald-600/5",
              },
              {
                icon: Lock,
                title: "Secure & Private",
                description: "Your inspection data is processed securely with enterprise-grade encryption.",
                color: "text-rose-400",
                bg: "from-rose-500/20 to-rose-600/5",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
              >
                <SpotlightCard className="group p-6 h-full card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center space-y-4 mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-blue-300">
              <TrendingUp className="w-4 h-4" />
              How It Works
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
              Three simple <span className="gradient-text">steps</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Upload Report",
                description: "Drag and drop your PDF inspection or thermal report. We handle the parsing automatically.",
                icon: FileText,
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI engine extracts observations, identifies anomalies, and assesses risks in real-time.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Get Insights",
                description: "Review structured findings, severity scores, and export your DDR in any format.",
                icon: Download,
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative">
                <div className="glass rounded-2xl p-8 text-center space-y-4 h-full">
                  <div className="text-6xl font-black text-white/5 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-12 text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to transform your <span className="gradient-text">inspections?</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Join hundreds of inspectors who use DDR AI to generate faster, smarter diagnostic reports.
              </p>
              <MagneticButton strength={20}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg btn-lift"
                >
                  Start Generating Reports
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center space-y-4 mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-rose-300">
              <Mail className="w-4 h-4" />
              Contact Us
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
              Get in <span className="gradient-text">touch</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Have questions about DDR AI? We would love to hear from you.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {[
                { icon: Mail, title: "Email", value: "hello@ddr-ai.com", color: "text-blue-400" },
                { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", color: "text-emerald-400" },
                { icon: MapPin, title: "Address", value: "123 Innovation Drive, San Francisco, CA 94105", color: "text-purple-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center flex-shrink-0">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">{item.title}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 space-y-4"
            >
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl" />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Email</label>
                <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-xl" />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Message</label>
                <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl resize-none" />
              </div>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold btn-lift">
                Send Message
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
