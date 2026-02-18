"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Sparkles, Info } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

// 2025 Federal Tax Brackets (Single)
const singleBrackets = [
  { min: 0, max: 11925, rate: 10 },
  { min: 11925, max: 48475, rate: 12 },
  { min: 48475, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250525, rate: 32 },
  { min: 250525, max: 626350, rate: 35 },
  { min: 626350, max: Infinity, rate: 37 },
];

const marriedBrackets = [
  { min: 0, max: 23850, rate: 10 },
  { min: 23850, max: 96950, rate: 12 },
  { min: 96950, max: 206700, rate: 22 },
  { min: 206700, max: 394600, rate: 24 },
  { min: 394600, max: 501050, rate: 32 },
  { min: 501050, max: 751600, rate: 35 },
  { min: 751600, max: Infinity, rate: 37 },
];

function calcTax(income: number, brackets: typeof singleBrackets) {
  let totalTax = 0;
  const breakdown = [];

  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
    const tax = taxableInBracket * (bracket.rate / 100);
    totalTax += tax;
    if (taxableInBracket > 0) {
      breakdown.push({
        bracket: `${bracket.rate}%`,
        income: Math.round(taxableInBracket),
        tax: Math.round(tax),
        rate: bracket.rate,
      });
    }
  }

  return { totalTax, breakdown };
}

export function TaxBracketCalc() {
  const [income, setIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");
  const [calculated, setCalculated] = useState(false);

  const brackets = filingStatus === "single" ? singleBrackets : marriedBrackets;

  const results = useMemo(() => {
    const { totalTax, breakdown } = calcTax(income, brackets);
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
    const marginalRate = breakdown.length > 0 ? breakdown[breakdown.length - 1].rate : 0;
    const afterTax = income - totalTax;

    return { totalTax, breakdown, effectiveRate, marginalRate, afterTax };
  }, [income, brackets]);

  const colors = ["#10b981", "#34d399", "#6ee7b7", "#fbbf24", "#f97316", "#ef4444", "#dc2626"];

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];

    insights.push(
      `On ${formatMoney(income)} income, you'll pay ${formatMoney(results.totalTax)} in federal taxes. Your effective tax rate is ${results.effectiveRate.toFixed(1)}% — meaning you keep ${formatMoney(results.afterTax)} (${(100 - results.effectiveRate).toFixed(1)}% of your income).`
    );

    insights.push(
      `Important: Your marginal rate is ${results.marginalRate}%, but that does NOT mean all your income is taxed at ${results.marginalRate}%. Only income above ${formatMoney(results.breakdown.length > 1 ? brackets[results.breakdown.length - 1].min : 0)} is taxed at this rate. This is how marginal brackets work.`
    );

    // Tax reduction tips
    const tips = [];
    if (income > 50000) {
      tips.push("Maximize your 401(k) contributions ($23,500/year for 2025) to reduce taxable income");
    }
    if (income > 30000) {
      tips.push("Contribute to a Traditional IRA ($7,000/year) for an above-the-line deduction");
    }
    tips.push("Consider a Health Savings Account (HSA) if eligible — triple tax advantage");

    insights.push(`Tax reduction strategies:\n${tips.map(t => `- ${t}`).join("\n")}`);

    return insights.join("\n\n");
  }, [calculated, income, results, brackets]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Your Tax Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Annual Taxable Income</Label>
              <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} min={0} step={5000} />
            </div>
            <div className="space-y-2">
              <Label>Filing Status</Label>
              <div className="flex gap-3">
                {[
                  { value: "single" as const, label: "Single" },
                  { value: "married" as const, label: "Married Filing Jointly" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilingStatus(opt.value)}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${filingStatus === opt.value ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700" size="lg" onClick={() => setCalculated(true)}>
            Calculate Tax
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">Federal Tax</p>
                <p className="text-2xl font-bold text-red-800">{formatMoney(results.totalTax)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Effective Rate</p>
                <p className="text-2xl font-bold">{results.effectiveRate.toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Marginal Rate</p>
                <p className="text-2xl font-bold">{results.marginalRate}%</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">After Tax</p>
                <p className="text-2xl font-bold text-emerald-800">{formatMoney(results.afterTax)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-lg">Tax Breakdown by Bracket</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.breakdown}>
                    <XAxis dataKey="bracket" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => formatMoney(Number(value))} />
                    <Bar dataKey="tax" name="Tax Paid" radius={[4, 4, 0, 0]}>
                      {results.breakdown.map((_, idx) => (
                        <Cell key={idx} fill={colors[idx % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Tax Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((p, i) => (
                  <p key={i} className="leading-relaxed text-gray-700 whitespace-pre-line">{p}</p>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400"><Info className="h-3 w-3" /> Based on 2025 federal brackets. State taxes not included. Not tax advice.</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
