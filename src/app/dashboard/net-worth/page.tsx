"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Entry {
  id: string;
  month: string;
  cash: number;
  investments: number;
  real_estate: number;
  other_assets: number;
  loans: number;
  credit_cards: number;
  other_liabilities: number;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function calcNetWorth(e: Entry) {
  const assets = e.cash + e.investments + e.real_estate + e.other_assets;
  const liabilities = e.loans + e.credit_cards + e.other_liabilities;
  return assets - liabilities;
}

const emptyForm = {
  month: new Date().toISOString().slice(0, 7),
  cash: 0, investments: 0, real_estate: 0, other_assets: 0,
  loans: 0, credit_cards: 0, other_liabilities: 0,
};

export default function NetWorthPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("is_pro").eq("id", user.id).single();
      if (!profile?.is_pro) { router.push("/pricing"); return; }

      const { data } = await supabase.from("net_worth_entries").select("*").order("month");
      setEntries(data ?? []);
    }
    load();
  }, [router]);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("net_worth_entries").upsert({
      user_id: user.id,
      month: form.month + "-01",
      cash: Number(form.cash),
      investments: Number(form.investments),
      real_estate: Number(form.real_estate),
      other_assets: Number(form.other_assets),
      loans: Number(form.loans),
      credit_cards: Number(form.credit_cards),
      other_liabilities: Number(form.other_liabilities),
    }, { onConflict: "user_id,month" });

    const { data } = await supabase.from("net_worth_entries").select("*").order("month");
    setEntries(data ?? []);
    setShowForm(false);
    setSaving(false);
  }

  const chartData = entries.map((e) => ({
    month: e.month.slice(0, 7),
    netWorth: calcNetWorth(e),
    assets: e.cash + e.investments + e.real_estate + e.other_assets,
    liabilities: e.loans + e.credit_cards + e.other_liabilities,
  }));

  const latest = entries[entries.length - 1];
  const prev = entries[entries.length - 2];
  const currentNW = latest ? calcNetWorth(latest) : 0;
  const prevNW = prev ? calcNetWorth(prev) : 0;
  const delta = currentNW - prevNW;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Net Worth Tracker</h1>
            <p className="mt-1 text-sm text-gray-500">Track your wealth month by month</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Add Month
          </button>
        </div>

        {/* Summary cards */}
        {latest && (
          <div className="mb-8 grid gap-4 grid-cols-3">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Net Worth</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(currentNW)}</p>
              {prev && (
                <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {formatCurrency(Math.abs(delta))} vs last month
                </p>
              )}
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Assets</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {formatCurrency(latest.cash + latest.investments + latest.real_estate + latest.other_assets)}
              </p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Liabilities</p>
              <p className="mt-1 text-2xl font-bold text-red-500">
                {formatCurrency(latest.loans + latest.credit_cards + latest.other_liabilities)}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">Net Worth Over Time</h2>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number | undefined) => v != null ? formatCurrency(v) : ""} />
                <Area type="monotone" dataKey="netWorth" stroke="#059669" fill="#d1fae5" strokeWidth={2} name="Net Worth" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Add month form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Add / Update Month</h2>
            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-gray-700">Month</label>
              <input type="month" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-emerald-600 uppercase tracking-wide">Assets</h3>
                {[
                  { key: "cash", label: "Cash & Savings" },
                  { key: "investments", label: "Investments" },
                  { key: "real_estate", label: "Real Estate" },
                  { key: "other_assets", label: "Other Assets" },
                ].map(({ key, label }) => (
                  <div key={key} className="mb-3">
                    <label className="mb-1 block text-xs text-gray-600">{label}</label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400">$</span>
                      <input type="number" min="0" value={(form as Record<string, number | string>)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-red-500 uppercase tracking-wide">Liabilities</h3>
                {[
                  { key: "loans", label: "Loans & Mortgages" },
                  { key: "credit_cards", label: "Credit Cards" },
                  { key: "other_liabilities", label: "Other Liabilities" },
                ].map(({ key, label }) => (
                  <div key={key} className="mb-3">
                    <label className="mb-1 block text-xs text-gray-600">{label}</label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400">$</span>
                      <input type="number" min="0" value={(form as Record<string, number | string>)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="text-sm">
                <span className="text-gray-500">Net Worth preview: </span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(
                    Number(form.cash) + Number(form.investments) + Number(form.real_estate) + Number(form.other_assets)
                    - Number(form.loans) - Number(form.credit_cards) - Number(form.other_liabilities)
                  )}
                </span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History table */}
        {entries.length === 0 && !showForm && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <Minus className="mx-auto mb-3 h-8 w-8 text-gray-300" />
            <p className="text-gray-500">No data yet. Add your first month to start tracking.</p>
          </div>
        )}

        {entries.length > 0 && (
          <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Assets</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Liabilities</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net Worth</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[...entries].reverse().map((e) => {
                  const assets = e.cash + e.investments + e.real_estate + e.other_assets;
                  const liabilities = e.loans + e.credit_cards + e.other_liabilities;
                  const nw = assets - liabilities;
                  return (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{e.month.slice(0, 7)}</td>
                      <td className="px-4 py-3 text-right text-emerald-600">{formatCurrency(assets)}</td>
                      <td className="px-4 py-3 text-right text-red-500">{formatCurrency(liabilities)}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{formatCurrency(nw)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
