"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  name: string;
  phone: string;
  plan: string;
  sector: string;
  paidAt: string | null;
  createdAt: string;
  utmSource: string | null;
  allergies: string | null;
}

interface PlanCount {
  plan: string;
  _count: number;
}

interface Settings {
  whatsappGroupUrl: string;
  counterSeed: number;
  totalSpots: number;
}

interface Stats {
  total: number;
  byPlan: PlanCount[];
  recent: Booking[];
  counter: { spotsTaken: number; totalSpots: number } | null;
  settings: Settings | null;
}

const PLAN_LABELS: Record<string, string> = { calm: "Calm", fit: "Fit", daily: "Daily" };
const PLAN_COLORS: Record<string, string> = { calm: "#2D6A4F", fit: "#D17A22", daily: "#E8A317" };

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [settingsForm, setSettingsForm] = useState<Settings>({ whatsappGroupUrl: "", counterSeed: 347, totalSpots: 500 });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [tab, setTab] = useState<"dashboard" | "members" | "settings">("dashboard");

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/admin/stats");
    if (res.status === 401) { router.push("/admin/login"); return; }
    if (!res.ok) { setLoading(false); return; }
    const data = await res.json();
    setStats(data);
    if (data.settings) setSettingsForm(data.settings);
    else setSettingsForm({ whatsappGroupUrl: "https://wa.me/919999999999", counterSeed: 347, totalSpots: 500 });
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsForm),
    });
    if (res.ok) {
      setSaveMsg("Saved successfully");
      fetchStats();
    } else {
      setSaveMsg("Failed to save");
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const filtered = (stats?.recent ?? []).filter((b) => {
    const matchesPlan = planFilter === "all" || b.plan === planFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || b.name.toLowerCase().includes(q) || b.phone.includes(q) || b.sector.toLowerCase().includes(q);
    return matchesPlan && matchesSearch;
  }) ?? [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-ink-3">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-canvas border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-ink font-semibold text-lg" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
          fobox admin
        </h1>
        <button onClick={handleLogout} className="text-ink-3 hover:text-ink text-sm transition-colors cursor-pointer">
          Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-canvas border-b border-border px-6 flex gap-6">
        {(["dashboard", "members", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="py-3 text-sm font-medium capitalize transition-colors cursor-pointer"
            style={{
              color: tab === t ? "var(--ink)" : "var(--ink-3)",
              borderBottom: tab === t ? "2px solid var(--ink)" : "2px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <div className="flex flex-col gap-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-canvas border border-border rounded-[10px] p-5">
                <p className="text-ink-3 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>Total Founders</p>
                <p className="text-ink font-bold" style={{ fontSize: "2.5rem", fontFamily: "var(--font-fraunces), Georgia, serif", lineHeight: 1 }}>
                  {stats?.total ?? 0}
                </p>
                <p className="text-ink-3 text-xs mt-1">of {stats?.counter?.totalSpots ?? 500} spots</p>
              </div>
              {["calm", "fit", "daily"].map((plan) => {
                const count = stats?.byPlan.find((p) => p.plan === plan)?._count ?? 0;
                return (
                  <div key={plan} className="bg-canvas border border-border rounded-[10px] p-5">
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", color: PLAN_COLORS[plan] }}>
                      {PLAN_LABELS[plan]}
                    </p>
                    <p className="font-bold" style={{ fontSize: "2.5rem", fontFamily: "var(--font-fraunces), Georgia, serif", lineHeight: 1, color: PLAN_COLORS[plan] }}>
                      {count}
                    </p>
                    <p className="text-ink-3 text-xs mt-1">members</p>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="bg-canvas border border-border rounded-[10px] p-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-ink font-medium text-sm">Founding spots filled</p>
                <p className="text-ink-3 text-sm" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                  {stats?.total ?? 0} / {stats?.counter?.totalSpots ?? 500}
                </p>
              </div>
              <div className="w-full bg-paper-deep rounded-full" style={{ height: "10px" }}>
                <div
                  className="rounded-full transition-all"
                  style={{
                    height: "10px",
                    width: `${Math.min(100, ((stats?.total ?? 0) / (stats?.counter?.totalSpots ?? 500)) * 100)}%`,
                    backgroundColor: "var(--mint)",
                  }}
                />
              </div>
            </div>

            {/* Recent 5 */}
            <div className="bg-canvas border border-border rounded-[10px] p-6">
              <p className="text-ink font-medium mb-4">Recent sign-ups</p>
              {stats?.recent.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-ink text-sm font-medium">{b.name}</p>
                    <p className="text-ink-3 text-xs">{b.sector} · {b.phone}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: PLAN_COLORS[b.plan] + "22", color: PLAN_COLORS[b.plan] }}>
                    {PLAN_LABELS[b.plan]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEMBERS TAB */}
        {tab === "members" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search name, phone, sector..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-canvas border border-border rounded-[6px] px-4 text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong"
                style={{ height: "40px", fontSize: "14px" }}
              />
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="bg-canvas border border-border rounded-[6px] px-4 text-ink focus:outline-none focus:border-border-strong"
                style={{ height: "40px", fontSize: "14px" }}
              >
                <option value="all">All plans</option>
                <option value="calm">Calm</option>
                <option value="fit">Fit</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div className="bg-canvas border border-border rounded-[10px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-paper">
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">Name</th>
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">Phone</th>
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">Plan</th>
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">Sector</th>
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">Joined</th>
                      <th className="text-left px-4 py-3 text-ink-3 font-medium text-xs uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center text-ink-3 py-10">No members found</td>
                      </tr>
                    )}
                    {filtered.map((b, i) => (
                      <tr key={b.id} className="border-b border-border last:border-0 hover:bg-paper transition-colors">
                        <td className="px-4 py-3 text-ink-3" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{i + 1}</td>
                        <td className="px-4 py-3 text-ink font-medium">{b.name}</td>
                        <td className="px-4 py-3 text-ink-2" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{b.phone}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: PLAN_COLORS[b.plan] + "22", color: PLAN_COLORS[b.plan] }}>
                            {PLAN_LABELS[b.plan] ?? b.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-ink-2">{b.sector}</td>
                        <td className="px-4 py-3 text-ink-3 text-xs" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                          {b.paidAt ? new Date(b.paidAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                        </td>
                        <td className="px-4 py-3 text-ink-3 text-xs max-w-[160px] truncate">{b.allergies || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-border bg-paper text-ink-3 text-xs">
                Showing {filtered.length} of {stats?.total ?? 0} members
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <div className="max-w-lg">
            <form onSubmit={handleSaveSettings} className="bg-canvas border border-border rounded-[10px] p-6 flex flex-col gap-6">
              <div>
                <label className="block text-ink font-medium text-sm mb-1.5">WhatsApp Group URL</label>
                <input
                  type="url"
                  value={settingsForm.whatsappGroupUrl}
                  onChange={(e) => setSettingsForm((f) => ({ ...f, whatsappGroupUrl: e.target.value }))}
                  className="w-full bg-paper border border-border rounded-[6px] px-4 text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors"
                  style={{ height: "48px", fontSize: "15px" }}
                  placeholder="https://chat.whatsapp.com/..."
                />
                <p className="text-ink-3 text-xs mt-1">This link is sent in the welcome email to new members.</p>
              </div>

              <div>
                <label className="block text-ink font-medium text-sm mb-1.5">Counter seed</label>
                <input
                  type="number"
                  min={0}
                  value={settingsForm.counterSeed}
                  onChange={(e) => setSettingsForm((f) => ({ ...f, counterSeed: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-paper border border-border rounded-[6px] px-4 text-ink focus:outline-none focus:border-border-strong transition-colors"
                  style={{ height: "48px", fontSize: "15px" }}
                />
                <p className="text-ink-3 text-xs mt-1">The base count shown on the homepage counter (real bookings stack on top).</p>
              </div>

              <div>
                <label className="block text-ink font-medium text-sm mb-1.5">Total spots</label>
                <input
                  type="number"
                  min={1}
                  value={settingsForm.totalSpots}
                  onChange={(e) => setSettingsForm((f) => ({ ...f, totalSpots: parseInt(e.target.value) || 500 }))}
                  className="w-full bg-paper border border-border rounded-[6px] px-4 text-ink focus:outline-none focus:border-border-strong transition-colors"
                  style={{ height: "48px", fontSize: "15px" }}
                />
                <p className="text-ink-3 text-xs mt-1">Maximum number of founding member spots.</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-[6px] text-paper font-medium text-sm transition-opacity disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: "var(--ink)" }}
                >
                  {saving ? "Saving..." : "Save settings"}
                </button>
                {saveMsg && (
                  <p className={`text-sm ${saveMsg.includes("Failed") ? "text-error" : "text-mint"}`}>{saveMsg}</p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
