import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  Sparkles,
  MessageSquare,
  Compass,
  Terminal,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Network
} from "lucide-react";
import { CusButton } from "@/components/form/FormButton";
import { ROUTES } from "@/constants/routes";
import OperatorProfileSection from "./OperatorProfileSection";

const HomePage = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Drag and Drop Handlers
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setUploadedFile(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans antialiased selection:bg-orange-500/30 selection:text-white relative overflow-x-hidden">

      {/* GLOBAL GRAPH BACKGROUND PATTERN */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* ================================================================= */}
      {/* SCREEN 1: THE POWER HERO LAYER SPLIT                              */}
      {/* ================================================================= */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center px-6 sm:px-12 py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 w-full items-center">

          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-gray-400">
                AI Alignment Core Active // V1.0
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-light tracking-tight leading-[1.1]">
              Optimize your target <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-400">
                career trajectory.
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg font-light max-w-lg leading-relaxed">
              Drop your profile dataset into our parser ecosystem. Grade structural performance metrics, audit engineering vocabulary, and fetch aligned workspace openings instantaneously.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CusButton
                label="Explore Matrix System"
                variant="primary"
                onClick={() => navigate(ROUTES.ANALYSIS)}
                className="!py-4 !px-6 !text-xs font-bold uppercase tracking-[0.15em] shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20"
              />
              <a
                href="#engine-breakdown"
                className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 hover:text-white transition-colors py-3 px-4"
              >
                Learn Mechanics ↓
              </a>
            </div>
          </div>

          {/* Right Dropzone Container */}
          <div className="w-full max-w-xl mx-auto lg:ml-auto">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-[#141414] border-2 rounded-2xl p-8 text-center transition-all duration-300 relative group flex flex-col justify-center items-center aspect-[4/3] ${isDragging
                  ? "border-orange-500 bg-orange-500/[0.02] shadow-2xl shadow-orange-500/10"
                  : "border-white/10 hover:border-white/20"
                }`}
            >
              <div className="absolute top-0 left-0 right-0 p-3 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between rounded-t-2xl">
                <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">
                  Data Stream Ingest // PDF Only
                </span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                </div>
              </div>

              {!uploadedFile ? (
                <div className="space-y-4 pt-4">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto group-hover:border-orange-500/30 group-hover:bg-orange-500/5 transition-all duration-300">
                    <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white cursor-pointer hover:text-orange-400 transition-colors">
                      <span>Upload your dataset</span>
                      <input type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
                    </label>
                    <p className="text-xs text-gray-500 font-light mt-1.5">or drag and drop resume matrix here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pt-4 w-full px-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-3 bg-[#0f0f0f] border border-white/[0.06] p-4 rounded-xl text-left w-full">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-white truncate">{uploadedFile.name}</p>
                      <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB // STATUS: READY
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                  </div>
                  <div className="flex gap-3 w-full">
                    <CusButton label="Clear" variant="ghost" className="w-1/3 !text-xs !py-3 !text-gray-500 hover:!text-white" onClick={() => setUploadedFile(null)} />
                    <CusButton label="Initialize Audit" variant="primary" className="w-2/3 !text-xs !py-3 font-bold uppercase tracking-wider" onClick={() => navigate(ROUTES.ANALYSIS)} />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SCREEN 2: THE METRIC ENGINE BREAKDOWN                             */}
      {/* ================================================================= */}
      <section id="engine-breakdown" className="px-6 sm:px-12 py-24 bg-[#141414]/40 border-y border-white/[0.03]">
        <div className="max-w-[1600px] mx-auto space-y-16">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500 uppercase block mb-2">
              System Capabilities // Operational Specifications
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Engineered to convert unformatted credentials into live market capital.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-white/[0.05] p-8 rounded-2xl">
              <Sparkles className="w-5 h-5 text-orange-500 mb-6" />
              <h3 className="text-lg font-medium text-white mb-2 tracking-tight">AI Resume Auditing</h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Executes micro-structural scoring loops across technical skill clusters, flagging terminology errors and computing high-accuracy profile benchmarks instantly out of 10.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/[0.05] p-8 rounded-2xl">
              <MessageSquare className="w-5 h-5 text-orange-500 mb-6" />
              <h3 className="text-lg font-medium text-white mb-2 tracking-tight">Contextual Chat Threads</h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Engage directly with the parser engine memory to draft targeted resume entries, build learnable engineering roadmaps, and fix experience descriptions interactively.
              </p>
            </div>

            <div className="bg-[#141414] border border-white/[0.05] p-8 rounded-2xl">
              <Compass className="w-5 h-5 text-orange-500 mb-6" />
              <h3 className="text-lg font-medium text-white mb-2 tracking-tight">Real-Time Scraping Engine</h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Deploys automated web scrapers to gather precision-aligned open positions based strictly on parsed datasets. Fetch, cycle, and track live matches seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SCREEN 3: OPERATOR PROFILE (RECRUITER ENGINE NODE)               */}
      {/* ================================================================= */}
      <OperatorProfileSection/>

      {/* ================================================================= */}
      {/* SCREEN 4: DISPATCH NODE (CONTACT FOOTER SYSTEM)                  */}
      {/* ================================================================= */}
      <footer className="border-t border-white/[0.05] bg-[#0c0c0c] px-6 sm:px-12 py-16">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="space-y-2 text-center md:text-left">
            <p className="text-white text-sm font-semibold tracking-wider uppercase">
              Role<span className="text-orange-500">Met</span>
            </p>
            <p className="text-[11px] text-gray-600 font-mono tracking-widest uppercase">
              DATA_PORTAL // END_OF_FILE
            </p>
          </div>

          {/* Social Network Links Using Path-Optimized SVGs */}
          <div className="flex flex-wrap items-center justify-center gap-4">

            {/* INLINE LINKEDIN SVG LINK */}
            <a
              href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-mono text-gray-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/[0.01] transition-all group"
            >
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>NET.LINK // LINKEDIN</span>
              <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* INLINE GITHUB SVG LINK */}
            <a
              href={import.meta.env.VITE_GITHUB_URL || "https://github.com"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-mono text-gray-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/[0.01] transition-all group"
            >
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.005.07 1.533 1.032 1.533 1.032.892 1.53 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>CODE.REPO // GITHUB</span>
              <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* SECURE MAIL LINK */}
            <a
              href={`mailto:${import.meta.env.VITE_EMAIL_ID || "premdave3705@gmail.com"}`}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-mono text-gray-400 hover:text-white hover:border-orange-500/30 hover:bg-orange-500/[0.01] transition-all group"
            >
              <Mail className="w-3.5 h-3.5 group-hover:text-orange-500 transition-colors" />
              <span>SECURE.MAIL // DISPATCH</span>
              <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

          </div>

        </div>
      </footer>

    </div>
  );
};

export default HomePage;