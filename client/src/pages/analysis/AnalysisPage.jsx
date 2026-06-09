import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Briefcase, 
  RefreshCw, 
  Send, 
  Sparkles, 
  Terminal, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight, 
  Cpu,
  Target
} from "lucide-react";
import { AnalysisSidebar } from "./AnalysisSidebar";
import { Card } from "@/components/common/Card";
import { CusButton } from "@/components/form/FormButton";

const INITIAL_CHATS = [
  {
    id: "scan_01",
    title: "Full-Stack Project Transition Scan",
    timestamp: "10 min ago",
    resumeScore: 7.2,
    refreshCount: 0,
    targetRole: "Full-Stack Engineer",
    messages: [
      { sender: "ai", text: "Resume analysis initialized. Your MERN stack experience is strong, but adding a dedicated TypeScript project would bridge current enterprise deployment gaps." },
      { sender: "user", text: "Should I focus on NestJS or standard Express?" },
      { sender: "ai", text: "Standard Express with TypeScript interfaces keeps your architecture minimal and fast, matching your current design style perfectly." }
    ],
    jobSuggestions: [
      { id: "s_job_1", title: "Senior Backend Developer", company: "Alpha E Barcode", location: "Ahmedabad, GJ", postedDate: "2d ago", matchScore: 9.2, type: "Full-Time", whyMatched: "Aligned accurately with your Node.js server engine architectural experience context.", applyUrl: "#" },
      { id: "s_job_2", title: "React UI Engineer", company: "Gsoft Solutions", location: "Remote", postedDate: "5d ago", matchScore: 8.5, type: "Contract", whyMatched: "Matches your precise frontend layout and state management configurations.", applyUrl: "#" }
    ]
  }
];

const AnalysisPage = () => {
  // 1. Core States
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(null); 
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'jobs'
  const [inputMessage, setInputMessage] = useState("");

  // UPLOADER & PROCESSING STATES
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [targetRoleInput, setTargetRoleInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentLogLine, setCurrentLogLine] = useState("READY_FOR_INGEST");

  // 2. Selectors & Filters
  const filteredChats = chats.filter((c) => 
    c.title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );
  const activeChat = chats.find((c) => c.id === activeChatId);
  const refreshLeft = activeChat ? 2 - activeChat.refreshCount : 0;

  const logSequences = [
    "INITIALIZING_VECTOR_STREAM...",
    "EXTRACTING_TEXT_MATRIX_NODES...",
    "PARSING_MERN_FRAMEWORK_WEIGHTS...",
    "CROSS_REFERENCING_LIVE_MARKET_OPENINGS...",
    "COMPUTING_ALIGNMENT_INDEX...",
    "SYNCHRONIZING_WORKSPACE_DIALOGUE..."
  ];

  // 3. Simulated Processing Hooks
  useEffect(() => {
    let progressInterval;
    let logInterval;

    if (isAnalyzing) {
      progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 35);

      let logIndex = 0;
      logInterval = setInterval(() => {
        if (logIndex < logSequences.length) {
          setCurrentLogLine(logSequences[logIndex]);
          logIndex++;
        }
      }, 600);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [isAnalyzing]);

  useEffect(() => {
    if (loadingProgress === 100 && uploadedFile) {
      const newChatId = `scan_${Date.now()}`;
      const finalRole = targetRoleInput.trim() || "Full-Stack Engineer";
      
      const newChatNode = {
        id: newChatId,
        title: `Analysis // ${uploadedFile.name.replace(".pdf", "")}`,
        timestamp: "Just now",
        resumeScore: (Math.random() * (9.5 - 7.0) + 7.0).toFixed(1),
        refreshCount: 0,
        targetRole: finalRole,
        messages: [
          { sender: "ai", text: `Successfully parsed "${uploadedFile.name}". I have aligned your credentials against standard requirements for ${finalRole}. Use the thread below to optimize your system parameters.` }
        ],
        jobSuggestions: [
          { 
            id: `s_job_${Date.now()}`, 
            title: finalRole, 
            company: "System Scraped Position", 
            location: "Remote", 
            postedDate: "Just now", 
            matchScore: 8.8, 
            type: "Full-Time", 
            whyMatched: "Generated profile vectors match core engineering variables found inside your uploaded file documents.", 
            applyUrl: "#" 
          }
        ]
      };

      setChats((prev) => [newChatNode, ...prev]);
      setActiveChatId(newChatId);
      setActiveTab("chat");
      
      // Cleanup
      setIsAnalyzing(false);
      setLoadingProgress(0);
      setUploadedFile(null);
      setTargetRoleInput("");
    }
  }, [loadingProgress]);

  // 4. Command Action Handlers
  const handleStartChat = (e) => {
    e.preventDefault();
    if (!uploadedFile) return;
    setIsAnalyzing(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, messages: [...c.messages, { sender: "user", text: inputMessage }] } : c));
    setInputMessage("");
  };

  const handleRefreshJobs = () => {
    if (refreshLeft <= 0) return;
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, refreshCount: c.refreshCount + 1, jobSuggestions: [...c.jobSuggestions, { id: `ref_${Date.now()}`, title: activeChat.targetRole, company: "Alpha E Scraped Node", location: "Ahmedabad", postedDate: "Just now", matchScore: 9.0, type: "Full-Time", whyMatched: "Matches backend pipeline skill adjustments computed from active message sessions.", applyUrl: "#" }] } : c));
  };

  const handleRemoveSuggestedJob = (id) => {
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, jobSuggestions: c.jobSuggestions.filter((job) => job.id !== id) } : c));
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] bg-[#0f0f0f] w-full overflow-hidden text-white antialiased">
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* 1. HISTORY SIDEBAR */}
      <AnalysisSidebar
        chats={filteredChats}
        activeChatId={activeChatId}
        onSelectChat={(id) => { setActiveChatId(id); setIsAnalyzing(false); }}
        onNewChat={() => { setActiveChatId(null); setIsAnalyzing(false); }}
        searchQuery={sidebarSearch}
        onSearchChange={setSidebarSearch}
      />

      {/* 2. MAIN ACTIVE WORKSPACE FRAME */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* ========================================================== */}
        {/* PANEL STATE A: THE SYSTEM ANALYZING LOADER                 */}
        {/* ========================================================== */}
        {isAnalyzing ? (
          <div className="flex-1 bg-[#0f0f0f] flex flex-col items-center justify-center p-8 relative select-none">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="w-full max-w-sm text-center space-y-6 relative z-10 animate-in fade-in duration-300">
              <div className="relative w-16 h-16 bg-[#141414] border border-white/10 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <Cpu className="w-6 h-6 text-orange-500 relative z-10 animate-pulse" />
                <span className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl animate-ping" style={{ animationDuration: '2s' }} />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-white tracking-wide">Processing Profile Metrics</p>
                <div className="h-4 flex items-center justify-center overflow-hidden">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest animate-in slide-in-from-bottom-2 duration-300" key={currentLogLine}>
                    {currentLogLine}
                  </p>
                </div>
              </div>
              <div className="w-full bg-[#141414] border border-white/5 h-1.5 rounded-full overflow-hidden relative">
                <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${loadingProgress}%` }} />
              </div>
              <span className="text-xl font-mono font-black text-orange-500 tracking-tight block">{loadingProgress}%</span>
            </div>
          </div>
        ) : !activeChatId ? (
          
          // ==========================================================
          // PANEL STATE B: CLEAN INDUSTRIAL RESUME DROPZONE INTAKE    //
          // ==========================================================
          <div className="flex-1 overflow-y-auto scrollbar-none p-8 flex flex-col items-center justify-center bg-[#0f0f0f]">
            <div className="w-full max-w-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/5 border border-orange-500/10 rounded-full mx-auto">
                  <Terminal className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-[9px] font-mono tracking-[0.2em] text-orange-400 uppercase font-bold">Ingest Core // Session Initialize</span>
                </div>
                <h2 className="text-3xl font-light tracking-tight text-white">
                  Start New Resume <span className="font-semibold text-orange-500">Audit</span>
                </h2>
              </div>

              <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-6 shadow-2xl space-y-4">
                {/* TARGET ROLE INPUT */}
                <div className="bg-[#0f0f0f] border border-white/[0.04] focus-within:border-orange-500/20 rounded-xl p-4 transition-colors">
                  <label className="text-gray-600 font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 mb-1.5 select-none">
                    <Target className="w-3.5 h-3.5 text-gray-700" /> Target Job Role Destination
                  </label>
                  <input
                    type="text"
                    value={targetRoleInput}
                    onChange={(e) => setTargetRoleInput(e.target.value)}
                    placeholder="e.g. Full-Stack Developer"
                    className="w-full bg-transparent border-none text-xs text-white tracking-wide font-light p-0 focus:outline-none focus:ring-0 placeholder-gray-600"
                  />
                </div>

                {/* DROPZONE ACCENTS */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault(); setIsDragging(false);
                    const files = e.dataTransfer.files;
                    if (files.length > 0 && files[0].type === "application/pdf") setUploadedFile(files[0]);
                  }}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 relative group flex flex-col items-center justify-center min-h-[160px] bg-[#0f0f0f] ${
                    isDragging ? "border-orange-500 bg-orange-500/[0.01]" : "border-white/5 hover:border-white/10"
                  }`}
                >
                  {!uploadedFile ? (
                    <div className="space-y-3 pointer-events-none">
                      <UploadCloud className="w-6 h-6 text-gray-500 group-hover:text-orange-500 transition-colors mx-auto" />
                      <label className="text-xs font-medium text-gray-300 pointer-events-auto cursor-pointer hover:text-orange-400 transition-colors">
                        <span>Upload your profile PDF</span>
                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setUploadedFile(e.target.files[0]); }} />
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 w-full max-w-md bg-[#141414] border border-white/[0.04] p-4 rounded-xl text-left">
                      <FileText className="w-5 h-5 text-orange-500 shrink-0" />
                      <div className="overflow-hidden flex-1">
                        <p className="text-xs text-white font-medium truncate">{uploadedFile.name}</p>
                        <p className="text-[9px] font-mono text-gray-500 mt-0.5">DATASTREAM_READY</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                  )}
                </div>

                <button
                  disabled={!uploadedFile}
                  onClick={handleStartChat}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 disabled:bg-white/[0.02] text-white disabled:text-gray-600 font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 shadow-lg enabled:shadow-orange-500/10 active:enabled:scale-[0.98]"
                >
                  <span>Initialize AI Conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ) : (
          
          // ==========================================================
          // PANEL STATE C: RESTORED SCORECARD HEADER & TABS HUB        //
          // ==========================================================
          <>
            {/* RESTORED PREMIUM SCORECARD HEADER PANEL */}
            <div className="w-full bg-[#141414] border-b border-white/[0.04] p-5 shrink-0 z-10 select-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-xl">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-gray-500 uppercase block mb-1">
                    Active Session Ledger // Target Metadata
                  </span>
                  <h2 className="text-base font-semibold text-white tracking-tight truncate">
                    {activeChat?.title}
                  </h2>
                </div>

                {/* Industrial Score Box Component */}
                <div className="flex items-center gap-4 bg-[#0f0f0f] border border-white/[0.04] rounded-xl px-4 py-2.5 self-start sm:self-auto shrink-0 font-mono">
                  <div className="text-left pr-4 border-r border-white/[0.05]">
                    <span className="text-[8px] text-gray-500 uppercase tracking-wider block">SCORE</span>
                    <span className="text-base font-bold text-orange-500">{activeChat?.resumeScore}<span className="text-[10px] text-gray-600 font-light">/10</span></span>
                  </div>
                  <div className="text-xs text-gray-400 font-sans font-light hidden lg:block">
                    <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest block font-medium">VERIFIED SPEC TARGET</span>
                    {activeChat?.targetRole}
                  </div>
                </div>
              </div>
            </div>

            {/* RESTORED STICKY TAB NAV STRIP BAR */}
            <div className="w-full bg-[#0f0f0f] border-b border-white/[0.03] px-6 shrink-0 flex items-center justify-between z-10 select-none">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold py-4 transition-all relative focus:outline-none ${
                    activeTab === "chat" ? "text-orange-500 border-b border-orange-500" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  AI Feedback Thread
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold py-4 transition-all relative focus:outline-none ${
                    activeTab === "jobs" ? "text-orange-500 border-b border-orange-500" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Target Matches ({activeChat?.jobSuggestions.length})
                </button>
              </div>
            </div>

            {/* MAIN CONTENT VIEWPORTS GRID */}
            <div className="flex-1 overflow-y-auto scrollbar-none p-6 bg-[#0f0f0f]">
              
              {/* TAB 1: CONVERSATIONAL FEED THREAD */}
              {activeTab === "chat" && (
                <div className="space-y-4 max-w-3xl mx-auto pb-28 animate-in fade-in duration-200">
                  {activeChat?.messages.map((msg, index) => {
                    const isAI = msg.sender === "ai";
                    return (
                      <div 
                        key={index}
                        className={`flex gap-4 p-5 rounded-xl border font-sans text-xs sm:text-sm font-light leading-relaxed max-w-2xl ${
                          isAI ? "bg-[#141414] border-white/[0.04] text-gray-300 mr-auto" : "bg-orange-500/5 border-orange-500/10 text-gray-200 ml-auto flex-row-reverse text-right"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[9px] font-bold shrink-0 ${isAI ? "bg-orange-500 text-white" : "bg-white/5 text-gray-400"}`}>
                          {isAI ? "AI" : "OP"}
                        </div>
                        <p className="pt-0.5">{msg.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "jobs" && (
                <div className="space-y-4 max-w-5xl mx-auto pb-24 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between bg-[#141414] border border-white/[0.04] p-4 rounded-xl gap-4 flex-wrap">
                    <p className="text-xs text-gray-400 font-light">Scraped positions synced against active parameters indices.</p>
                    <CusButton
                      label={refreshLeft > 0 ? `Cycle Matches (${refreshLeft} left)` : "Scrape Limit Hit"}
                      disabled={refreshLeft === 0}
                      icon={RefreshCw}
                      variant="outline"
                      size="sm"
                      className="!text-[10px] tracking-widest border-white/10 hover:!bg-white/5 !text-white"
                      onClick={handleRefreshJobs}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeChat?.jobSuggestions.map((job) => (
                      <Card key={job.id} job={job} onRemove={handleRemoveSuggestedJob} />
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* FIXED LOWER INPUT FIELD ROW (ONLY RENDERS ON CHAT THREADS) */}
            {activeTab === "chat" && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/95 to-transparent pt-12 pb-6 px-6 z-20">
                <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative bg-[#141414] border border-white/[0.06] rounded-xl shadow-2xl focus-within:border-orange-500/40 transition-colors flex items-center">
                  <input
                    type="text"
                    placeholder="Ask a question about your parsed resume profile fields..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full bg-transparent px-5 py-4 text-xs sm:text-sm font-light text-white placeholder-gray-600 focus:outline-none pr-16"
                  />
                  <button type="submit" className="absolute right-3 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors focus:outline-none">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default AnalysisPage;