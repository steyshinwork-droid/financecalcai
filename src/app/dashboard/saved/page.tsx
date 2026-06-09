"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Trash2, Calculator, BookmarkCheck } from "lucide-react";
import Link from "next/link";

interface SavedCalc {
  id: string;
  calculator_type: string;
  title: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  created_at: string;
}

const calcLinks: Record<string, string> = {
  mortgage: "/mortgage-calculator",
  compound_interest: "/compound-interest-calculator",
  budget: "/budget-calculator",
  retirement: "/retirement-calculator",
  investment: "/investment-calculator",
  debt_payoff: "/debt-payoff-calculator",
  savings_goal: "/savings-goal-calculator",
};

export default function SavedPage() {
  const router = useRouter();
  const [calcs, setCalcs] = useState<SavedCalc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("is_pro").eq("id", user.id).single();
      if (!profile?.is_pro) { router.push("/pricing"); return; }

      const { data } = await supabase.from("saved_calculations").select("*").order("created_at", { ascending: false });
      setCalcs(data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("saved_calculations").delete().eq("id", id);
    setCalcs((prev) => prev.filter((c) => c.id !== id));
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Saved Calculations</h1>
          <p className="mt-1 text-sm text-gray-500">Your saved scenarios and plans</p>
        </div>

        {calcs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <BookmarkCheck className="mx-auto mb-3 h-8 w-8 text-gray-300" />
            <p className="text-gray-500 mb-4">No saved calculations yet.</p>
            <p className="text-sm text-gray-400">
              Open any calculator and click the &ldquo;Save&rdquo; button to save your scenario.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {calcs.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <Calculator className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{c.title}</p>
                  <p className="text-xs text-gray-500">
                    {c.calculator_type.replace(/_/g, " ")} ·{" "}
                    {new Date(c.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {calcLinks[c.calculator_type] && (
                    <Link
                      href={calcLinks[c.calculator_type]}
                      className="rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                    >
                      Open
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
