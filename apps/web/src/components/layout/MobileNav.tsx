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
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: "/dashboard", label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/lessons", label: t.sidebar.lessons, icon: BookOpen },
    { href: "/dashboard/practice", label: t.sidebar.practice, icon: MessageSquare },
    { href: "/dashboard/stats", label: t.sidebar.statistics, icon: BarChart3 },
    { href: "/dashboard/settings", label: t.sidebar.settings, icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-teal-400"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
