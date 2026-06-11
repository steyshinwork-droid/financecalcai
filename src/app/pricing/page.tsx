"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Crown, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase";

const freeFeatures = [
  "22 financial calculators",
  "AI-powered insights",
  "308 expert articles",
  "Basic calculations",
];

const proFeatures = [
  "Everything in Free",
  "Net Worth Tracker (monthly history)",
  "Save & revisit calculations",
  "Ad-free experience",
  "Priority support",
];

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleUpgrade() {
    if (!user) {
      router.push("/signup");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/stripe/create-checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Simple, honest pricing</h1>
        <p className="mt-3 text-lg text-gray-600">Start free. Upgrade when you need more.</p>
      </div>

      {success && (
        <div className="mb-8 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center text-emerald-700">
          Welcome to PRO! Your account has been upgraded.
        </div>
      )}
      {canceled && (
        <div className="mb-8 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-center text-yellow-700">
          Payment canceled. You can upgrade anytime.
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {/* Free */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900">Free</h2>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500"> / month</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">No credit card required</p>
          </div>
          <ul className="mb-8 space-y-3">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
          >
            Get started free
          </button>
        </div>

        {/* PRO */}
        <div className="relative rounded-2xl border-2 border-emerald-500 bg-white p-8 shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white">
              MOST POPULAR
            </span>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">PRO</h2>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">$7</span>
              <span className="text-gray-500"> / month</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Cancel anytime</p>
          </div>
          <ul className="mb-8 space-y-3">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Redirecting..." : user ? "Upgrade to PRO" : "Get started"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Secure payment via Stripe. Cancel anytime from your dashboard.
      </p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
        <PricingContent />
      </Suspense>
    </div>
  );
}
