import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Crown, TrendingUp, BookmarkCheck, ArrowRight, CheckCircle } from "lucide-react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro, email")
    .eq("id", user.id)
    .single();

  const isPro = profile?.is_pro ?? false;
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {params.success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>Welcome to PRO! You now have access to all premium features.</span>
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          </div>
          {isPro ? (
            <span className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
              <Crown className="h-4 w-4" /> PRO
            </span>
          ) : (
            <Link
              href="/pricing"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Upgrade to PRO
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Net Worth Tracker */}
          <div className={`rounded-2xl border bg-white p-6 shadow-sm ${!isPro ? "opacity-60" : ""}`}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Net Worth Tracker</h2>
                <p className="text-xs text-gray-500">Track your wealth over time</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Record your assets and liabilities monthly. See your net worth grow with interactive charts.
            </p>
            {isPro ? (
              <Link
                href="/dashboard/net-worth"
                className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Open tracker <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href="/pricing" className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <Crown className="h-4 w-4 text-yellow-500" /> PRO feature — Upgrade
              </Link>
            )}
          </div>

          {/* Saved Calculations */}
          <div className={`rounded-2xl border bg-white p-6 shadow-sm ${!isPro ? "opacity-60" : ""}`}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Saved Calculations</h2>
                <p className="text-xs text-gray-500">Revisit your scenarios</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Save mortgage plans, retirement projections, and budgets. Come back and compare scenarios anytime.
            </p>
            {isPro ? (
              <Link
                href="/dashboard/saved"
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View saved <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href="/pricing" className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <Crown className="h-4 w-4 text-yellow-500" /> PRO feature — Upgrade
              </Link>
            )}
          </div>
        </div>

        {!isPro && (
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-white">
            <Crown className="mb-3 h-8 w-8 text-yellow-300" />
            <h3 className="text-xl font-bold">Unlock all PRO features for $7/month</h3>
            <p className="mt-2 text-emerald-100">
              Net Worth Tracker, saved calculations, and an ad-free experience.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Upgrade now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
