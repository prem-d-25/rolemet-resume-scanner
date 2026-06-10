import React from "react";
import { Terminal } from "lucide-react";

const LogoBlock = () => {
  return (
    <div className="mb-10 flex items-center gap-3 group select-none">
      {/* Dynamic SVG Topology Vector Box */}
      <div className="w-10 h-10 bg-[#141414] border border-white/10 rounded-xl flex items-center justify-center relative shadow-xl transition-all duration-300 group-hover:border-orange-500/30">
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-orange-500" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-orange-500" />
        <Terminal className="w-4 h-4 text-orange-500" />
      </div>

      {/* Typography Scale Engine */}
      <div className="flex flex-col text-left">
        <span className="text-sm font-bold tracking-wider text-white font-sans uppercase leading-none">
          Role<span className="text-orange-500">Met</span>
        </span>
        <span className="text-[8px] font-mono tracking-[0.25em] text-gray-500 uppercase mt-0.5">
          Parser_Core
        </span>
      </div>
    </div>
  );
};

export default LogoBlock;