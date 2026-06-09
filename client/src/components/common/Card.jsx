import React from "react";
import { MapPin, Calendar, ExternalLink, Sparkles } from "lucide-react";

export const Card = ({ job, onRemove }) => {
  return (
    <div className="bg-[#141414] border border-white/[0.06] hover:border-orange-500/30 rounded-xl p-5 transition-all duration-300 group relative overflow-hidden flex flex-col gap-4 shadow-lg shadow-black/20">
      
      {/* BACKGROUND INTERACTIVE GLOW */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.01] group-hover:bg-orange-500/[0.03] rounded-full blur-xl pointer-events-none transition-all duration-300" />

      {/* UPPER METRICS LAYER */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 relative z-10">
        <div className="space-y-1">
          {/* High-Spec Meta Badges */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-orange-500/5 border border-orange-500/15 text-orange-400 text-[8px] font-mono rounded uppercase tracking-widest flex items-center gap-1 font-semibold">
              <Sparkles className="w-2.5 h-2.5 animate-pulse" /> MATCH INDEX // {job.matchScore}/10
            </span>
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">
              {job.type}
            </span>
          </div>

          <h2 className="text-base font-semibold text-white tracking-tight group-hover:text-orange-500 transition-colors duration-300">
            {job.title}
          </h2>
          <p className="text-xs text-gray-400 font-light tracking-wide">
            {job.company}
          </p>
        </div>

        {/* Compact Operational Meta Strings */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 font-mono text-[9px] text-gray-500 shrink-0 pt-1">
          <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-600" /> <span>{job.location}</span></div>
          <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-gray-600" /> <span>{job.postedDate}</span></div>
        </div>
      </div>

      {/* COMPACT AI CONTEXT CARD */}
      <div className="bg-[#0f0f0f] border border-white/[0.04] px-4 py-3 rounded-lg relative z-10 transition-colors group-hover:border-white/[0.06]">
        <span className="text-[8px] font-mono tracking-[0.25em] text-orange-500/70 uppercase block mb-1 font-semibold">
          AI Context Matrix // Core Match Reason
        </span>
        <p className="text-xs font-light text-gray-400 leading-relaxed">
          {job.whyMatched}
        </p>
      </div>

      {/* LOWER ACTION LAYOUT ROW */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] relative z-10">
        
        {/* PREMIUM CLEAN REMOVE MATCH LINK */}
        <button
          onClick={() => onRemove(job.id)}
          className="text-gray-600 hover:text-red-400 font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition-colors py-1.5 focus:outline-none relative"
          title="Remove vacancy node from saved data array"
        >
          Remove Match
        </button>

        {/* MINIMALIST PREMIUM APPLY BUTTON */}
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/50 text-orange-400 hover:text-orange-300 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
        >
          <span>Apply</span>
          <ExternalLink className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

    </div>
  );
};