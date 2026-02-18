"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Percent, Sparkles, Info } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function RetirementCalc() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [rate, setRate] = useState(7);
  const [annualExpenses, setAnnualExpenses] = useState(50000);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const yearsToRetire = retireAge - age;
    const monthlyRate = rate / 100 / 12;
    const chartData = [];

    let balance = currentSavings;
    for (let y = 0; y <= yearsToRetire; y++) {
      chartData.push({
        age: age + y,
        balance: Math.round(balance),
      });
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
    }

    const retirementBalance = chartData[chartData.length - 1].balance;
    const neededFor4Percent = annualExpenses * 25;
    const monthlyRetirementIncome = (retirementBalance * 0.04) / 12;
    const readinessScore = Math.min(100, Math.round((retirementBalance / neededFor4Percent) * 100));

    // How many years savings will last
    let tempBalance = retirementBalance;
    let lastingYears = 0;
    const withdrawalRate = rate > 2 ? rate - 2 : 1; // lower return in retirement
    while (tempBalance > 0 && lastingYears < 100) {
      tempBalance = tempBalance * (1 + withdrawalRate / 100) - annualExpenses;
      lastingYears++;
    }

    return {
      retirementBalance,
      neededFor4Percent,
      monthlyRetirementIncome,
      readinessScore,
      lastingYears,
      chartData,
      yearsToRetire,
    };
  }, [age, retireAge, currentSavings, monthlyContribution, rate, annualExpenses]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];

    if (results.readinessScore >= 100) {
      insights.push(
        `Excellent! You're on track to have ${formatMoney(results.retirementBalance)} by age ${retireAge} — that's ${results.readinessScore}% of your goal. You'll be able to withdraw ${formatMoney(results.monthlyRetirementIncome)}/month in retirement, which covers your ${formatMoney(annualExpenses / 12)}/month expenses.`
      );
    } else if (results.readinessScore >= 70) {
      insights.push(
        `You're at ${results.readinessScore}% readiness. You'll have ${formatMoney(results.retirementBalance)} but need ${formatMoney(results.neededFor4Percent)} for a comfortable retirement. Gap: ${formatMoney(results.neededFor4Percent - results.retirementBalance)}. Consider increasing contributions or working a few more years.`
      );
    } else {
      const gap = results.neededFor4Percent - results.retirementBalance;
      const extraMonthly = (gap * (rate / 100 / 12)) / (Math.pow(1 + rate / 100 / 12, results.yearsToRetire * 12) - 1);
      insights.push(
        `Warning: At ${results.readinessScore}% readiness, you're significantly behind. You need an additional ${formatMoney(extraMonthly)}/month to close the gap. Options: increase income, reduce expenses, delay retirement to ${retireAge + 5}, or invest more aggressively.`
      );
    }

    insights.push(
      `Your savings will last approximately ${results.lastingYears} years in retirement. ${results.lastingYears >= 30 ? "That should cover a full retirement." : "Consider saving more — aim for 30+ years of coverage."}`
    );

    if (monthlyContribution < currentSavings * 0.01 && currentSavings > 10000) {
      insights.push(
        `You're contributing less per month than 1% of your current savings. Even small increases make a huge difference: adding just $200/month more could mean ${formatMoney(200 * 12 * results.yearsToRetire * 1.5)} more at retirement.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, retireAge, annualExpenses, monthlyContribution, currentSavings, rate]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Retirement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Current Age
              </Label>
              <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={18} max={80} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Retirement Age
              </Label>
              <Input type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} min={age + 1} max={90} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Current Retirement Savings
              </Label>
              <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} min={0} step={5000} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Monthly Contribution
              </Label>
              <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} min={0} step={100} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Expected Return (%)
              </Label>
              <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} max={15} step={0.5} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Annual Expenses in Retirement
              </Label>
              <Input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} min={0} step={5000} />
            </div>
          </div>
          <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700" size="lg" onClick={() => setCalculated(true)}>
            Calculate Retirement Plan
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className={results.readinessScore >= 80 ? "border-emerald-200 bg-emerald-50" : results.readinessScore >= 50 ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}>
              <CardContent className="pt-6">
                <p className="text-sm">Readiness Score</p>
                <p className="text-3xl font-bold">{results.readinessScore}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">At Retirement</p>
                <p className="text-2xl font-bold">{formatMoney(results.retirementBalance)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Monthly Income (4%)</p>
                <p className="text-2xl font-bold">{formatMoney(results.monthlyRetirementIncome)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Savings Last</p>
                <p className="text-2xl font-bold">{results.lastingYears}+ years</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-lg">Retirement Savings Growth</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => formatMoney(Number(value))} />
                    <ReferenceLine y={results.neededFor4Percent} stroke="#ef4444" strokeDasharray="5 5" label="Goal" />
                    <Area type="monotone" dataKey="balance" stroke="#6366f1" fill="#e0e7ff" name="Savings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Retirement Analysis</Badge>
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
