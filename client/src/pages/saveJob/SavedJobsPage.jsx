import React, { useState } from "react";
import { Briefcase, Search, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/common/Card";

const INITIAL_SAVED_JOBS = [
  {
    id: "job_01",
    title: "Senior Full-Stack Developer",
    company: "Alpha E Barcode",
    location: "Ahmedabad, GJ (Remote)",
    postedDate: "2 days ago",
    matchScore: 9.5,
    type: "Full-Time",
    whyMatched: "Matches your React frontend architecture experience and Node.js logic runtime spec rules perfectly.",
    applyUrl: "https://example.com/apply/01"
  },
  {
    id: "job_02",
    title: "React UI Engineer",
    company: "Gsoft Solutions",
    location: "Mumbai, MH (Hybrid)",
    postedDate: "1 week ago",
    matchScore: 8.8,
    type: "Contract",
    whyMatched: "Matches your precise skill matrix configuration for TypeScript and state management.",
    applyUrl: "https://example.com/apply/02"
  }
];

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState(INITIAL_SAVED_JOBS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRemoveJob = (id) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const filteredJobs = savedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0f0f0f] text-white font-sans antialiased selection:bg-orange-500/30 relative">

      {/* GRAPH CANVAS BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* CONTROL INPUT STICKY BAR */}
      <div className="w-full bg-[#141414] border-b border-white/[0.05] px-6 py-5 sticky top-20 z-30">
        <div className="mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-gray-500 uppercase block mb-0.5">
              Data Ledger // Curated Positions
            </span>
            <h1 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              Saved Target Matches
              <span className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-400 font-mono rounded">
                {savedJobs.length} NODES
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto max-w-sm">
            <div className="relative w-full bg-[#0f0f0f] border border-white/[0.06] rounded-xl focus-within:border-orange-500/40 transition-colors flex items-center">
              <Search className="w-3.5 h-3.5 text-gray-600 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Query job title or company profile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-2.5 text-xs font-light text-white placeholder-gray-600 focus:outline-none"
              />
            </div>
            {/* <button className="p-2.5 bg-[#0f0f0f] border border-white/[0.06] hover:border-white/20 rounded-xl text-gray-400 hover:text-white transition-colors shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button> */}
          </div>
        </div>
      </div>

      {/* MAIN CARDS LIST CONTAINER */}
      <main className="px-6 py-8 max-w-8xl mx-auto">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/5 rounded-xl bg-[#141414]/20">
            <Briefcase className="w-6 h-6 text-gray-600 mx-auto mb-3" />
            <p className="text-xs text-gray-400 font-light">No saved vacancies found matching tracking vectors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                job={job}
                onRemove={handleRemoveJob}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedJobsPage;