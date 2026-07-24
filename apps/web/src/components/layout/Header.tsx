"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import Avatar from "@/components/ui/Avatar";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/hooks/useI18n";
import { Menu, Bell, ChevronDown, Settings, LogOut, User } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-4 ml-auto">
          <LanguageSwitcher />
          <button className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">
                  {user?.cefrLevel} · {user?.streak} {t.dashboard.thisWeek}
                </p>
              </div>
              <Avatar name={user?.name || "User"} imageUrl={user?.avatarUrl} size="md" />
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                >
                  <User size={18} />
                  <span>{t.settings.profile}</span>
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                >
                  <Settings size={18} />
                  <span>{t.sidebar.settings}</span>
                </Link>

                <div className="border-t border-slate-700/50 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-rose-400 transition-colors w-full"
                  >
                    <LogOut size={18} />
                    <span>{t.sidebar.logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}