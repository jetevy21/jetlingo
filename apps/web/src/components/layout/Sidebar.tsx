"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "@/hooks/useI18n";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { t } = useI18n();

  const navItems = [
    { href: "/dashboard", label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/lessons", label: t.sidebar.lessons, icon: BookOpen },
    { href: "/dashboard/practice", label: t.sidebar.practice, icon: MessageSquare },
    { href: "/dashboard/dictionary", label: t.sidebar.dictionary, icon: Zap },
    { href: "/dashboard/stats", label: t.sidebar.statistics, icon: BarChart3 },
    { href: "/dashboard/settings", label: t.sidebar.settings, icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900/50 border-r border-slate-700/50 h-screen sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <span className="text-xl">✈</span>
          </div>
          <span className="text-xl font-heading font-bold text-white">
            JetLingo
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-700/50">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-all duration-200 w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">{t.sidebar.logout}</span>
        </button>
      </div>
    </aside>
  );
}
