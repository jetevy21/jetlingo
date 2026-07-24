"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useI18n } from "@/hooks/useI18n";
import Button from "@/components/ui/Button";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  UserPlus,
  Mail,
  MoreVertical,
  BarChart3,
  BookOpen,
  Target,
  Building2,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  joinedAt: string;
  lastActiveAt: string | null;
  lessonsCompleted: number;
  streak: number;
  xp: number;
  level: string;
  status: "active" | "inactive";
}

export default function EnterprisePage() {
  const { user } = useAuthStore();
  const { t } = useI18n();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    // Demo team data
    setTeamMembers([
      {
        id: "1",
        name: "Amina Koné",
        email: "amina.kone@company.com",
        role: "admin",
        joinedAt: "2026-01-15",
        lastActiveAt: "2026-07-24",
        lessonsCompleted: 42,
        streak: 15,
        xp: 2850,
        level: "B1",
        status: "active",
      },
      {
        id: "2",
        name: "Ibrahim Touré",
        email: "ibrahim.toure@company.com",
        role: "member",
        joinedAt: "2026-02-20",
        lastActiveAt: "2026-07-23",
        lessonsCompleted: 35,
        streak: 8,
        xp: 2100,
        level: "A2",
        status: "active",
      },
      {
        id: "3",
        name: "Fatou Diop",
        email: "fatou.diop@company.com",
        role: "member",
        joinedAt: "2026-03-10",
        lastActiveAt: "2026-07-24",
        lessonsCompleted: 28,
        streak: 12,
        xp: 1680,
        level: "B1",
        status: "active",
      },
      {
        id: "4",
        name: "Moussa Camara",
        email: "moussa.camara@company.com",
        role: "member",
        joinedAt: "2026-04-05",
        lastActiveAt: "2026-07-20",
        lessonsCompleted: 15,
        streak: 3,
        xp: 900,
        level: "A2",
        status: "inactive",
      },
      {
        id: "5",
        name: "Aïssatou Bah",
        email: "aissatou.bah@company.com",
        role: "member",
        joinedAt: "2026-05-12",
        lastActiveAt: "2026-07-24",
        lessonsCompleted: 20,
        streak: 6,
        xp: 1200,
        level: "A1",
        status: "active",
      },
    ]);
  }, []);

  const stats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === "active").length,
    avgLessonsCompleted: Math.round(
      teamMembers.reduce((acc, m) => acc + m.lessonsCompleted, 0) /
        teamMembers.length
    ),
    totalXp: teamMembers.reduce((acc, m) => acc + m.xp, 0),
    avgStreak: Math.round(
      teamMembers.reduce((acc, m) => acc + m.streak, 0) / teamMembers.length
    ),
  };

  const handleInvite = () => {
    if (inviteEmail) {
      alert(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setShowInviteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Building2 size={28} className="text-teal-400" />
            <h1 className="text-2xl font-heading font-bold text-white">
              {t.enterprise?.title || "Enterprise Dashboard"}
            </h1>
          </div>
          <p className="text-slate-400">
            {t.enterprise?.subtitle || "Manage your team's learning progress"}
          </p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus size={16} className="mr-2" />
          {t.enterprise?.inviteMember || "Invite Member"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Users size={20} className="text-teal-400" />
            </div>
            <span className="text-sm text-slate-400">
              {t.enterprise?.totalMembers || "Total Members"}
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalMembers}</p>
          <p className="text-xs text-emerald-400 mt-1">
            {stats.activeMembers} active
          </p>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BookOpen size={20} className="text-blue-400" />
            </div>
            <span className="text-sm text-slate-400">
              {t.enterprise?.avgLessons || "Avg Lessons"}
            </span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.avgLessonsCompleted}
          </p>
          <p className="text-xs text-slate-400 mt-1">per member</p>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-amber-400" />
            </div>
            <span className="text-sm text-slate-400">
              {t.enterprise?.totalXp || "Total XP"}
            </span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalXp.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">earned</p>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Target size={20} className="text-purple-400" />
            </div>
            <span className="text-sm text-slate-400">
              {t.enterprise?.avgStreak || "Avg Streak"}
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.avgStreak}</p>
          <p className="text-xs text-slate-400 mt-1">days</p>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-lg font-heading font-semibold text-white">
            {t.enterprise?.teamMembers || "Team Members"}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t.enterprise?.member || "Member"}
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t.enterprise?.level || "Level"}
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t.enterprise?.lessons || "Lessons"}
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t.enterprise?.streak || "Streak"}
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t.enterprise?.status || "Status"}
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t.enterprise?.actions || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {member.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{
                            width: `${Math.min(
                              (member.lessonsCompleted / 50) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-slate-300">
                        {member.lessonsCompleted}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-amber-400" />
                      <span className="text-sm text-slate-300">
                        {member.streak}d
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                      }`}
                    >
                      {member.status === "active"
                        ? t.enterprise?.active || "Active"
                        : t.enterprise?.inactive || "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors cursor-pointer">
          <BarChart3 size={24} className="text-teal-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">
            {t.enterprise?.viewAnalytics || "View Analytics"}
          </h3>
          <p className="text-sm text-slate-400">
            {t.enterprise?.analyticsDesc ||
              "Detailed progress reports and insights"}
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors cursor-pointer">
          <Award size={24} className="text-amber-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">
            {t.enterprise?.customPaths || "Custom Learning Paths"}
          </h3>
          <p className="text-sm text-slate-400">
            {t.enterprise?.pathsDesc ||
              "Create tailored learning paths for your team"}
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors cursor-pointer">
          <Mail size={24} className="text-purple-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">
            {t.enterprise?.billing || "Billing & Invoices"}
          </h3>
          <p className="text-sm text-slate-400">
            {t.enterprise?.billingDesc ||
              "Manage your enterprise subscription"}
          </p>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-heading font-semibold text-white mb-4">
              {t.enterprise?.inviteTitle || "Invite Team Member"}
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              {t.enterprise?.inviteDesc ||
                "Send an email invitation to add a new team member."}
            </p>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleInvite}>
                <Mail size={16} className="mr-2" />
                {t.enterprise?.sendInvite || "Send Invite"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
