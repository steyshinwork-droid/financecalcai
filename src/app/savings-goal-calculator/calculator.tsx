"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  PiggyBank,
  DollarSign,
  Calendar,
  Percent,
  Sparkles,
  Info,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

export function SavingsGoalCalc() {
  const [goalStr, setGoal, goal] = useNumInput(20000);
  const [currentSavingsStr, setCurrentSavings, currentSavings] = useNumInput(2000);
  const [monthsStr, setMonths, months] = useNumInput(24);
  const [rateStr, setRate, rate] = useNumInput(4.5);
  const [incomeStr, setIncome, income] = useNumInput(5000);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const needed = goal - currentSavings;
    const monthlyRate = rate / 100 / 12;

    // Monthly savings needed
    let monthlySavings: number;
    if (monthlyRate > 0) {
      monthlySavings =
        (needed * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      monthlySavings = needed / months;
    }

    // Growth chart
    const chartData = [];
    let balance = currentSavings;
    for (let m = 0; m <= months; m++) {
      chartData.push({
        month: m === 0 ? "Now" : m % 6 === 0 || m === months ? `Mo ${m}` : "",
        balance: Math.round(balance),
        goal: goal,
      });
      balance = balance * (1 + monthlyRate) + monthlySavings;
    }

    const totalContributed = monthlySavings * months + currentSavings;
    const interestEarned = goal - totalContributed;

    return { monthlySavings, chartData, totalContributed, interestEarned };
  }, [goalStr, currentSavingsStr, monthsStr, rateStr, incomeStr]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];
    const savingsPercent =
      income > 0 ? (results.monthlySavings / income) * 100 : 0;
    const daily = results.monthlySavings / 30;

    insights.push(
      `To reach ${formatMoney(goal)} in ${months} months, save ${formatMoney(results.monthlySavings)}/month — that's ${formatMoney(daily)}/day or ${formatMoney(results.monthlySavings / 4)}/week.`
    );

    if (income > 0) {
      if (savingsPercent <= 10) {
        insights.push(
          `This is ${savingsPercent.toFixed(0)}% of your income — very manageable! You can easily fit this into your budget.`
        );
      } else if (savingsPercent <= 20) {
        insights.push(
          `This is ${savingsPercent.toFixed(0)}% of your income — doable but requires discipline. Set up automatic transfers on payday so you "pay yourself first."`
        );
      } else if (savingsPercent <= 35) {
        insights.push(
          `This is ${savingsPercent.toFixed(0)}% of your income — aggressive but possible. Consider extending your timeline to ${Math.ceil(months * 1.5)} months to reduce the monthly burden to about ${formatMoney(results.monthlySavings * 0.67)}/month.`
        );
      } else {
        insights.push(
          `This is ${savingsPercent.toFixed(0)}% of your income — likely too aggressive. Extend your timeline or reduce your goal to make it sustainable.`
        );
      }
    }

    if (rate > 0 && results.interestEarned > 0) {
      insights.push(
        `At ${rate}% APY (high-yield savings account), you'll earn ${formatMoney(results.interestEarned)} in interest — essentially free money working toward your goal.`
      );
    }

    if (rate < 4) {
      insights.push(
        `Tip: High-yield savings accounts currently offer 4-5% APY. Switching from a regular bank (0.01%) could earn you significantly more interest.`
      );
    }

    // Motivational tip
    insights.push(
      `Pro tip: Automate this! Set up a ${formatMoney(results.monthlySavings)} automatic transfer from checking to savings on each payday. Out of sight, out of mind — you won't miss it.`
    );

    return insights.join("\n\n");
  }, [calculated, goalStr, monthsStr, rateStr, incomeStr, results]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-amber-600" />
            Set Your Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="goal" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Savings Goal
              </Label>
              <Input
                id="goal"
                type="text"
                inputMode="numeric"
                value={goalStr}
                onChange={(e) => setGoal(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current" className="flex items-center gap-1">
                <PiggyBank className="h-4 w-4 text-gray-400" />
                Current Savings
              </Label>
              <Input
                id="current"
                type="text"
                inputMode="numeric"
                value={currentSavingsStr}
                onChange={(e) => setCurrentSavings(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="months" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                Time Frame (Months)
              </Label>
              <Input
                id="months"
                type="text"
                inputMode="numeric"
                value={monthsStr}
                onChange={(e) => setMonths(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate" className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" />
                Interest Rate / APY (%)
              </Label>
              <Input
                id="rate"
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => setRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="income" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Monthly Income (for AI feasibility check)
              </Label>
              <Input
                id="income"
                type="text"
                inputMode="numeric"
                value={incomeStr}
                onChange={(e) => setIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-amber-600 hover:bg-amber-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate Savings Plan
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <p className="text-sm text-amber-700">Save Per Month</p>
                <p className="text-2xl font-bold text-amber-800">
                  {formatMoney(results.monthlySavings)}
                </p>
                <p className="text-xs text-amber-600">
                  {formatMoney(results.monthlySavings / 4)}/week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">You Contribute</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatMoney(results.totalContributed)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Interest Earned</p>
                <p className="text-2xl font-bold text-emerald-800">
                  {formatMoney(Math.max(0, results.interestEarned))}
                </p>
                <p className="text-xs text-emerald-600">Free money!</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Path to Your Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) =>
                        v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
                      }
                    />
                    <Tooltip
                      formatter={(value) => formatMoney(Number(value))}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#d97706"
                      fill="#fef3c7"
                      name="Your Savings"
                    />
                    <Area
                      type="monotone"
                      dataKey="goal"
                      stroke="#10b981"
                      fill="none"
                      strokeDasharray="5 5"
                      name="Goal"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  Savings Plan
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((p, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" />
                For informational purposes only. Not financial advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
