import React from "react";
import { Terminal, ArrowUpRight, Mail } from "lucide-react";

const OperatorProfile = () => {
  return (
    <section className="px-6 sm:px-12 py-24 max-w-[1600px] mx-auto relative antialiased">
      {/* Decorative Blueprint Line */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] w-12 bg-orange-500" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">
          System Architect Manifest
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* LEFT COLUMN: THE INSIGHT PANEL (7 Columns) */}
        <div className="lg:col-span-7 bg-[#141414] border border-white/[0.06] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
          {/* Subtle grid backdrop overlay matching the theme style */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:30px_30px]" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.25em] text-gray-500 uppercase">
                <Terminal className="w-4 h-4 text-orange-500" />
                <span>Core Operational Profile // 01</span>
              </div>

              {/* STARK BLINKING WORK STATUS NODE */}
              <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-mono text-emerald-400 tracking-widest font-bold uppercase">
                  OPEN_TO_WORK
                </span>
              </div>
            </div>

            <h3 className="text-3xl font-light text-white tracking-tight leading-tight">
              Prem Dave <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                {import.meta.env.VITE_POSITION_TITLE}
              </span>
            </h3>

            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-xl">
              {import.meta.env.VITE_DESCRIPTION}
            </p>
          </div>

          {/* Inline Technical Framework Tags */}
          <div className="flex flex-wrap gap-2 pt-8 relative z-10 border-t border-white/[0.04] mt-6">
            {import.meta.env.VITE_SKILL_ARRAY.split(",").map((spec) => (
              <span key={spec} className="px-3 py-1 bg-[#0f0f0f] border border-white/[0.04] text-[10px] font-mono text-gray-400 rounded-md tracking-wide">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: DIRECT ACCESS TERMINAL LINKS (5 Columns) */}
        <div className="lg:col-span-5 bg-[#141414] border border-white/[0.06] rounded-2xl p-8 flex flex-col justify-center gap-4 shadow-xl">
          <p className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase mb-2">
            Direct Node Connections // External
          </p>

          {/* DIRECT NATIVE MAILTO CELL */}
          <a
            href="mailto:premdave3705@gmail.com"
            className="flex items-center justify-between gap-4 px-5 py-4 bg-[#0f0f0f] border border-white/5 hover:border-orange-500/30 rounded-xl text-gray-400 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/5 flex items-center justify-center border border-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <Mail className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex flex-col text-left font-sans">
                <span className="text-[9px] font-mono text-gray-600 tracking-wider font-semibold uppercase leading-none mb-1">Secure Email</span>
                <span className="text-xs text-gray-300 font-light tracking-wide normal-case">premdave3705@gmail.com</span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-20 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-orange-500" />
          </a>

          {/* PORTFOLIO LAUNCH LINK */}
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-4 px-5 py-4 bg-[#0f0f0f] border border-white/5 hover:border-orange-500/30 rounded-xl text-gray-400 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/5 flex items-center justify-center border border-orange-500/10 group-hover:border-orange-500/30 transition-colors">
                <Terminal className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex flex-col text-left font-sans">
                <span className="text-[9px] font-mono text-gray-600 tracking-wider font-semibold uppercase leading-none mb-1">Launch Node</span>
                <span className="text-xs text-orange-400 font-mono tracking-wider font-bold">PREMDAVE // PORTFOLIO</span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-20 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-orange-500" />
          </a>

        </div>

      </div>
    </section>
  );
};

export default OperatorProfile;