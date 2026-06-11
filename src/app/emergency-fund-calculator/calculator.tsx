"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Sparkles, Info, Shield, Calendar } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function EmergencyFundCalc() {
  const [monthlyExpensesStr, setMonthlyExpenses, monthlyExpenses] = useNumInput(3500);
  const [currentFundStr, setCurrentFund, currentFund] = useNumInput(2000);
  const [monthlyContributionStr, setMonthlyContribution, monthlyContribution] = useNumInput(300);
  const [dependentsStr, setDependents, dependents] = useNumInput(0);
  const [jobStability, setJobStability] = useState("stable");
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const recommendedMonths = dependents > 0 || jobStability === "unstable" ? 9 : jobStability === "freelance" ? 12 : 6;
    const targetFund = monthlyExpenses * recommendedMonths;
    const remaining = Math.max(0, targetFund - currentFund);
    const monthsToGoal = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : Infinity;
    const progress = targetFund > 0 ? Math.min(100, Math.round((currentFund / targetFund) * 100)) : 0;
    const coverageMonths = monthlyExpenses > 0 ? (currentFund / monthlyExpenses) : 0;

    const chartMonths = monthlyContribution > 0 && monthsToGoal !== Infinity ? Math.min(monthsToGoal + 3, 60) : 24;
    const chartData = Array.from({ length: chartMonths + 1 }, (_, i) => ({
      month: i,
      balance: Math.min(Math.round(currentFund + monthlyContribution * i), targetFund),
    }));

    return { recommendedMonths, targetFund, remaining, monthsToGoal, progress, coverageMonths, chartData };
  }, [monthlyExpensesStr, currentFundStr, monthlyContributionStr, dependentsStr, jobStability]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];

    insights.push(
      `Based on your situation (${dependents > 0 ? `${dependents} dependent(s), ` : ""}${jobStability} job), you need ${results.recommendedMonths} months of expenses = ${formatMoney(results.targetFund)} in your emergency fund.`
    );

    if (results.progress >= 100) {
      insights.push(`Congratulations! Your emergency fund is fully funded at ${formatMoney(currentFund)}. Consider investing any excess in a high-yield savings account (4-5% APY) or index funds.`);
    } else if (results.progress >= 50) {
      insights.push(`You're ${results.progress}% there! At ${formatMoney(monthlyContribution)}/month, you'll reach your goal in ${results.monthsToGoal} months. Keep going — you're making great progress.`);
    } else {
      insights.push(`You're at ${results.progress}% (${results.coverageMonths.toFixed(1)} months of coverage). ${results.monthsToGoal < 24 ? `At ${formatMoney(monthlyContribution)}/month, you'll be fully funded in ${results.monthsToGoal} months.` : `Consider increasing your monthly contribution to reach your goal faster.`}`);
    }

    insights.push(
      `Keep your emergency fund in a high-yield savings account (currently 4-5% APY), NOT in stocks. It needs to be instantly accessible and safe from market drops.`
    );

    if (results.coverageMonths < 1) {
      insights.push(
        `Urgent: You have less than 1 month of expenses saved. Even saving ${formatMoney(500)} is a start. Cut one subscription or eat out less this month to boost your fund.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, currentFundStr, monthlyContributionStr, dependentsStr, jobStability]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-sky-600" /> Your Situation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Monthly Essential Expenses</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={monthlyExpensesStr}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Current Emergency Fund</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={currentFundStr}
                onChange={(e) => setCurrentFund(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Monthly Savings Toward Fund</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={monthlyContributionStr}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><Calendar className="h-4 w-4 text-gray-400" /> Dependents</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={dependentsStr}
                onChange={(e) => setDependents(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Job Stability</Label>
              <div className="flex gap-3">
                {[
                  { value: "stable", label: "Stable (W-2)" },
                  { value: "unstable", label: "Less Stable" },
                  { value: "freelance", label: "Freelance/Self-employed" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setJobStability(opt.value)}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${jobStability === opt.value ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button className="mt-6 w-full bg-sky-600 hover:bg-sky-700" size="lg" onClick={() => setCalculated(true)}>
            Calculate Emergency Fund
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-sky-200 bg-sky-50">
              <CardContent className="pt-6">
                <p className="text-sm text-sky-700">Target Fund</p>
                <p className="text-2xl font-bold text-sky-800">{formatMoney(results.targetFund)}</p>
                <p className="text-xs text-sky-600">{results.recommendedMonths} months of expenses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Current Coverage</p>
                <p className="text-2xl font-bold">{results.coverageMonths.toFixed(1)} months</p>
              </CardContent>
            </Card>
            <Card className={results.progress >= 100 ? "border-emerald-200 bg-emerald-50" : ""}>
              <CardContent className="pt-6">
                <p className="text-sm">Progress</p>
                <p className="text-2xl font-bold">{results.progress}%</p>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-sky-500 transition-all" style={{ width: `${Math.min(100, results.progress)}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Months to Goal</p>
                <p className="text-2xl font-bold">{results.monthsToGoal === Infinity ? "N/A" : results.monthsToGoal}</p>
              </CardContent>
            </Card>
          </div>

          {results.monthsToGoal !== Infinity && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-800">
                  Savings Growth to Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={results.chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFund" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tickFormatter={(v) => `${v}mo`} tick={{ fontSize: 11 }} tickLine={false} />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} labelFormatter={(l) => `Month ${l}`} />
                    <ReferenceLine y={results.targetFund} stroke="#10b981" strokeDasharray="4 4" label={{ value: "Goal", position: "right", fontSize: 11, fill: "#10b981" }} />
                    <Area type="monotone" dataKey="balance" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorFund)" dot={false} name="Emergency Fund" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="emergency-fund"
              title={`$${monthlyExpensesStr}/mo expenses, $${currentFundStr} saved`}
              inputs={{ monthlyExpenses: monthlyExpensesStr, currentFund: currentFundStr, monthlyContribution: monthlyContributionStr, dependents: dependentsStr }}
              results={{
                targetFund: Math.round(results.targetFund),
                remaining: Math.round(results.remaining),
                monthsToGoal: results.monthsToGoal === Infinity ? 0 : results.monthsToGoal,
                progress: results.progress,
              }}
            />
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Emergency Fund Plan</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((p, i) => (<p key={i} className="leading-relaxed text-gray-700">{p}</p>))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400"><Info className="h-3 w-3" /> For informational purposes only. Not financial advice.</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
