import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/features/auth/authStore";
import { CusButton } from "@/components/form/FormButton";
import { LogOut, User, Menu, X, Bookmark, ChartLine, LayoutDashboard } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { logoutApi } from "@/api/auth.api";

// 1. Static Configuration moved outside of component layout memory block
const NAV_LINKS = [
  { label: "Home", path: ROUTES.HOME, icon: LayoutDashboard },
  { label: "My Analysis", path: ROUTES.ANALYSIS, icon: ChartLine },
  { label: "Saved Jobs", path: ROUTES.SAVED_JOBS, icon: Bookmark },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();

  const handleLogout = async () => {
    const resData = await logoutApi();
    setAuth({ accessToken: null, user: null });
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#0f0f0f] border-b border-white/[0.05] sticky top-0 z-50 antialiased font-sans select-none">
      <div className="mx-auto px-6 h-20 flex items-center justify-between">

        {/* BRAND LOGO AREA */}
        {/* BRAND LOGO AREA: HIGH-CONTRAST DATA TOPOLOGY */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-4 cursor-pointer group focus:outline-none"
          aria-label="RoleMet Home Workspace"
        >
          {/* High-Contrast Dynamic Container */}
          <div className="relative w-11 h-11 flex items-center justify-center bg-[#1a1a1a] border border-white/10 rounded-xl shadow-md group-hover:border-orange-500/40 transition-all duration-300 overflow-hidden">

            {/* Internal high-exposure technical grid */}
            <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:6px_6px]" />

            <svg
              viewBox="0 0 40 40"
              fill="none"
              className="w-8 h-8 transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out relative z-10"
            >
              {/* Wave System Alpha: Raw input profile (Brightened for visibility) */}
              <path
                d="M4 26 C 12 10, 16 34, 24 16 C 28 8, 32 22, 36 14"
                stroke="currentColor"
                strokeWidth="1.75"
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
                strokeLinecap="round"
              />

              {/* Wave System Beta: The Target Market Metrics (Glows with Orange Gradient) */}
              <path
                d="M4 22 C 10 30, 18 6, 22 22 C 28 34, 32 14, 36 18"
                stroke="url(#gradient-accent-pop)"
                strokeWidth="2.25"
                className="drop-shadow-[0_2px_4px_rgba(249,115,22,0.3)]"
                strokeLinecap="round"
              />

              {/* Intersecting Match Nodes */}
              <circle cx="21.5" cy="21" r="2" fill="#ff7a00" className="drop-shadow-[0_0_6px_#ff7a00]" />
              <circle cx="13.5" cy="21.5" r="2" fill="#ff7a00" className="drop-shadow-[0_0_6px_#ff7a00]" />

              <defs>
                <linearGradient id="gradient-accent-pop" x1="4" y1="20" x2="36" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ea580c" />
                  <stop offset="0.5" stopColor="#f97316" />
                  <stop offset="1" stopColor="#fdba74" />
                </linearGradient>
              </defs>
            </svg>

            {/* Passive Base Glow Layer -> Becomes highly visible on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/0 to-orange-500/0 group-hover:from-orange-600/10 group-hover:to-transparent transition-all duration-500" />
          </div>

          {/* Typography Suite (Capitalized & Bold Balanced) */}
          <div className="flex flex-col justify-center">
            <div className="text-white text-base font-bold tracking-[0.12em] uppercase leading-none mb-1.5 transition-colors group-hover:text-orange-500 duration-300">
              Role<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400 font-black tracking-[0.05em] lowercase">.met</span>
            </div>
            <div className="text-[9px] text-gray-500 font-mono tracking-[0.22em] uppercase leading-none transition-colors group-hover:text-gray-400">
              ANLYS.SYS // V.01
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 py-2 relative focus:outline-none ${isActive ? "text-orange-500" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-3.5 h-3.5 tracking-normal text-current" />
                  {label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-orange-500 rounded-full animate-in fade-in duration-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* PROFILE ACTIONS AREA */}
        <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
          <div className="h-4 w-[1px] bg-white/10 mr-2" aria-hidden="true" />

          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-expanded={showProfileMenu}
            aria-haspopup="true"
          >
            <div className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/10 flex items-center justify-center text-gray-300 group-hover:border-orange-500/50 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-medium text-white tracking-wide">
                {user?.name || "Prem Dave"}
              </p>
              <p className="text-[10px] text-gray-500 font-mono tracking-wider">
                {user?.role || "Operator"}
              </p>
            </div>
          </button>

          {/* User Dropdown Menu Layer */}
          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-48 bg-[#141414] border border-white/[0.08] rounded-xl shadow-2xl py-2 z-20 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                className="w-full px-4 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/[0.03] flex items-center gap-2 transition-colors font-medium tracking-wider text-left"
              >
                <User className="w-3.5 h-3.5" /> My Profile
              </button>
              <div className="h-[1px] bg-white/[0.05] my-1" aria-hidden="true" />
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/[0.05] flex items-center gap-2 transition-colors font-medium tracking-wider text-left"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>

        {/* MOBILE BURGER TRIGGER */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN OVERLAY */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0f0f] border-t border-white/[0.05] px-6 py-6 space-y-6 absolute left-0 right-0 top-20 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-3">
            {NAV_LINKS.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition-all ${isActive
                    ? "bg-orange-500/10 text-orange-500 border-l-2 border-orange-500"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                  }`
                }
              >
                <Icon className="w-4 h-4 text-current" />
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="h-[1px] bg-white/[0.05] my-4" aria-hidden="true" />

          {/* Mobile Profile & Logout */}
          <div className="flex items-center justify-between px-4">
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">{user?.name || "Prem Dave"}</p>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">{user?.email || "prem@alphae.com"}</p>
            </div>
            <CusButton
              label="Log Out"
              variant="ghost"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="!text-xs !text-red-400 hover:!bg-red-500/10 !px-3 !py-1.5"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;