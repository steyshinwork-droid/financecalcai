"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Percent, Sparkles, Info, Target } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
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

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function FireCalc() {
  const [ageStr, setAge, age] = useNumInput(30);
  const [currentSavingsStr, setCurrentSavings, currentSavings] = useNumInput(50000);
  const [monthlyContributionStr, setMonthlyContribution, monthlyContribution] = useNumInput(2000);
  const [rateStr, setRate, rate] = useNumInput(7);
  const [annualExpensesStr, setAnnualExpenses, annualExpenses] = useNumInput(40000);
  const [withdrawalRateStr, setWithdrawalRate, withdrawalRate] = useNumInput(4);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const wr = withdrawalRate > 0 ? withdrawalRate / 100 : 0.04;
    const fireNumber = annualExpenses / wr;
    const monthlyRate = rate / 100 / 12;

    // How many months until we hit FIRE number
    let balance = currentSavings;
    let months = 0;
    const maxMonths = 600; // 50 years cap

    while (balance < fireNumber && months < maxMonths) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      months++;
    }

    const yearsToFire = months / 12;
    const fireAge = age + yearsToFire;
    const portfolioAtFire = balance > fireNumber ? fireNumber : balance;
    const onTrack = months < maxMonths;

    // Progress
    const progress = Math.min(100, Math.round((currentSavings / fireNumber) * 100));

    // Monthly income at FIRE
    const monthlyIncome = (fireNumber * wr) / 12;

    // Chart data (yearly)
    const chartYears = Math.min(Math.ceil(yearsToFire) + 5, 50);
    let chartBalance = currentSavings;
    const chartData: { age: number; savings: number; fireNumber: number }[] = [];
    for (let y = 0; y <= chartYears; y++) {
      chartData.push({
        age: age + y,
        savings: Math.round(Math.min(chartBalance, fireNumber * 1.5)),
        fireNumber: Math.round(fireNumber),
      });
      for (let m = 0; m < 12; m++) {
        chartBalance = chartBalance * (1 + monthlyRate) + monthlyContribution;
      }
    }

    return {
      fireNumber,
      yearsToFire,
      fireAge,
      portfolioAtFire,
      onTrack,
      progress,
      monthlyIncome,
      chartData,
      months,
    };
  }, [ageStr, currentSavingsStr, monthlyContributionStr, rateStr, annualExpensesStr, withdrawalRateStr]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];
    const { fireNumber, yearsToFire, fireAge, onTrack, progress, monthlyIncome } = results;

    if (!onTrack) {
      insights.push(
        `At your current savings rate, you won't reach your FIRE number of ${formatMoney(fireNumber)} within 50 years. You need to either increase your monthly contribution, reduce annual expenses, or both.`
      );
    } else if (yearsToFire <= 10) {
      insights.push(
        `You're on an aggressive path to FIRE! At your current pace, you'll reach ${formatMoney(fireNumber)} in approximately ${yearsToFire.toFixed(1)} years — at age ${fireAge.toFixed(0)}. That's ${formatMoney(monthlyIncome)}/month in passive income at a ${withdrawalRate}% withdrawal rate.`
      );
    } else {
      insights.push(
        `You're ${progress}% of the way to your FIRE number of ${formatMoney(fireNumber)}. At your current savings rate of ${formatMoney(monthlyContribution)}/month, you'll reach FIRE in approximately ${yearsToFire.toFixed(1)} years — at age ${fireAge.toFixed(0)}. Your monthly passive income at FIRE: ${formatMoney(monthlyIncome)}.`
      );
    }

    const extraMonthly500 = 500;
    const monthlyRate = rate / 100 / 12;
    let testBalance = currentSavings;
    let testMonths = 0;
    while (testBalance < fireNumber && testMonths < 600) {
      testBalance = testBalance * (1 + monthlyRate) + (monthlyContribution + extraMonthly500);
      testMonths++;
    }
    if (testMonths < results.months && results.months < 600) {
      const yearsSaved = (results.months - testMonths) / 12;
      insights.push(
        `Adding just $500/month more in contributions would cut ${yearsSaved.toFixed(1)} years off your FIRE timeline. Every dollar of monthly savings has outsized impact at your current stage because it compounds for decades.`
      );
    }

    if (annualExpenses > 80000) {
      insights.push(
        `Your planned retirement expenses of ${formatMoney(annualExpenses)}/year represent a Fat FIRE lifestyle (typically $80,000+/year). Your FIRE number of ${formatMoney(fireNumber)} is substantial — consider whether reducing expenses by 10–20% would meaningfully accelerate your timeline while still maintaining quality of life.`
      );
    } else if (annualExpenses < 35000) {
      insights.push(
        `Your planned expenses of ${formatMoney(annualExpenses)}/year align with Lean FIRE. Your smaller FIRE number (${formatMoney(fireNumber)}) means a faster path, but leaves little buffer. Consider building a small "rainy day" buffer above your FIRE number before fully retiring.`
      );
    }

    if (withdrawalRate > 4) {
      insights.push(
        `You're using a ${withdrawalRate}% withdrawal rate, which is above the traditional 4% rule. Higher withdrawal rates increase the risk of running out of money — especially with a long retirement horizon of 40+ years. Studies suggest 3.5–4% is safer for early retirees.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, annualExpenses, monthlyContribution, withdrawalRate, rate, currentSavings]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-fuchsia-600" /> Your FIRE Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Current Age
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={ageStr}
                onChange={(e) => setAge(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Current Savings / Investments
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={currentSavingsStr}
                onChange={(e) => setCurrentSavings(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Monthly Investment Contribution
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={monthlyContributionStr}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Expected Annual Return (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => setRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Annual Expenses in Retirement
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={annualExpensesStr}
                onChange={(e) => setAnnualExpenses(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Safe Withdrawal Rate (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={withdrawalRateStr}
                onChange={(e) => setWithdrawalRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-fuchsia-600 hover:bg-fuchsia-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate My FIRE Date
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-fuchsia-200 bg-fuchsia-50">
              <CardContent className="pt-6">
                <p className="text-sm text-fuchsia-700">FIRE Number</p>
                <p className="text-2xl font-bold text-fuchsia-900">{formatMoney(results.fireNumber)}</p>
                <p className="text-xs text-fuchsia-600">
                  {withdrawalRate}% SWR × expenses
                </p>
              </CardContent>
            </Card>
            <Card className={results.onTrack ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}>
              <CardContent className="pt-6">
                <p className={`text-sm ${results.onTrack ? "text-emerald-700" : "text-red-700"}`}>
                  {results.onTrack ? "FIRE Age" : "Status"}
                </p>
                <p className={`text-2xl font-bold ${results.onTrack ? "text-emerald-900" : "text-red-900"}`}>
                  {results.onTrack ? `Age ${results.fireAge.toFixed(0)}` : "Review Plan"}
                </p>
                <p className={`text-xs ${results.onTrack ? "text-emerald-600" : "text-red-600"}`}>
                  {results.onTrack
                    ? `${results.yearsToFire.toFixed(1)} years away`
                    : "Increase savings or reduce expenses"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Current Progress</p>
                <p className="text-2xl font-bold">{results.progress}%</p>
                <p className="text-xs text-gray-400">of FIRE number reached</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Monthly Income at FIRE</p>
                <p className="text-2xl font-bold">{formatMoney(results.monthlyIncome)}</p>
                <p className="text-xs text-gray-400">passive income / month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">Savings Growth vs. FIRE Number</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="age" tick={{ fontSize: 12 }} label={{ value: "Age", position: "insideBottom", offset: -2 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) =>
                        v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`
                      }
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        formatMoney(Number(value)),
                        name === "savings" ? "Portfolio Value" : "FIRE Number",
                      ]}
                      labelFormatter={(l) => `Age ${l}`}
                    />
                    <ReferenceLine
                      y={results.fireNumber}
                      stroke="#d946ef"
                      strokeDasharray="5 5"
                      label={{ value: "FIRE", fill: "#d946ef", fontSize: 12 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#d946ef"
                      fill="#fdf4ff"
                      strokeWidth={2}
                      name="savings"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="fire"
              title={`FIRE at age ${results.fireAge.toFixed(0)}, number: ${formatMoney(results.fireNumber)}`}
              inputs={{ age, currentSavings, monthlyContribution, rate, annualExpenses, withdrawalRate }}
              results={{
                fireNumber: Math.round(results.fireNumber),
                fireAge: parseFloat(results.fireAge.toFixed(1)),
                yearsToFire: parseFloat(results.yearsToFire.toFixed(1)),
                monthlyIncome: Math.round(results.monthlyIncome),
                progress: results.progress,
              }}
            />
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">FIRE Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((p, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">{p}</p>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" /> Projections assume constant returns. Actual results will vary. Not financial advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
