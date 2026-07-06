"use client";

import Link from "next/link";
import { Calculator, Menu, X, User, LogOut, LayoutDashboard, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const calculators = [
  { name: "Compound Interest", href: "/compound-interest-calculator" },
  { name: "Mortgage", href: "/mortgage-calculator" },
  { name: "Budget", href: "/budget-calculator" },
  { name: "Debt Payoff", href: "/debt-payoff-calculator" },
  { name: "Savings Goal", href: "/savings-goal-calculator" },
  { name: "Retirement", href: "/retirement-calculator" },
  { name: "Investment", href: "/investment-calculator" },
  { name: "Net Worth", href: "/net-worth-calculator" },
  { name: "Emergency Fund", href: "/emergency-fund-calculator" },
  { name: "Tax Bracket", href: "/tax-bracket-calculator" },
  { name: "Credit Card Payoff", href: "/credit-card-payoff-calculator" },
  { name: "Loan Comparison", href: "/loan-comparison-calculator" },
  { name: "Rent vs. Buy", href: "/rent-vs-buy-calculator" },
  { name: "Student Loan", href: "/student-loan-calculator" },
  { name: "Home Affordability", href: "/home-affordability-calculator" },
  { name: "Paycheck", href: "/paycheck-calculator" },
  { name: "Dividend", href: "/dividend-calculator" },
  { name: "Social Security", href: "/social-security-calculator" },
  { name: "FIRE", href: "/fire-calculator" },
  { name: "HSA", href: "/hsa-calculator" },
  { name: "College Savings", href: "/college-savings-calculator" },
];

export function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Finance<span className="text-emerald-600">Calc</span>AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {calculators.slice(0, 3).map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="text-sm text-gray-600 transition hover:text-emerald-600"
            >
              {calc.name}
            </Link>
          ))}
          <Link
            href="/#calculators"
            className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
          >
            All Calculators
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
          >
            Pricing
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600"
              >
                <User className="h-4 w-4" />
                <span className="max-w-[120px] truncate">{user.email?.split("@")[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white p-1 shadow-lg">
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Crown className="h-4 w-4 text-yellow-500" />
                    Upgrade to PRO
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 transition hover:text-emerald-600"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Get PRO
              </Link>
            </div>
          )}
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t bg-white px-4 py-4 md:hidden">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="block py-2 text-gray-600 transition hover:text-emerald-600"
              onClick={() => setMenuOpen(false)}
            >
              {calc.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className="block py-2 font-medium text-gray-600 transition hover:text-emerald-600"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="block py-2 font-medium text-gray-600 transition hover:text-emerald-600"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </Link>
          <hr className="my-2" />
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 font-medium text-emerald-600"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                className="block py-2 text-sm text-red-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="flex-1 rounded-lg border py-2 text-center text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Get PRO
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
