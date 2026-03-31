"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  Sparkles,
  Info,
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

function generateAIInsight(
  _principal: number,
  monthly: number,
  rate: number,
  years: number,
  total: number,
  totalContributions: number,
  totalInterest: number
): string {
  const interestRatio = totalInterest / totalContributions;
  const monthlyNeededFor1M =
    rate > 0
      ? (1000000 * (rate / 100 / 12)) /
        (Math.pow(1 + rate / 100 / 12, years * 12) - 1)
      : 1000000 / (years * 12);

  const insights: string[] = [];

  // Main result insight
  if (interestRatio > 1.5) {
    insights.push(
      `Your money is working hard for you! You'll earn ${formatMoney(totalInterest)} in interest — that's ${interestRatio.toFixed(1)}x more than what you put in. This is the magic of compound interest over ${years} years.`
    );
  } else if (interestRatio > 0.5) {
    insights.push(
      `Over ${years} years, compound interest will add ${formatMoney(totalInterest)} to your savings — about ${(interestRatio * 100).toFixed(0)}% of your total contributions. The longer you keep investing, the more powerful this effect becomes.`
    );
  } else {
    insights.push(
      `In ${years} years, you'll earn ${formatMoney(totalInterest)} in interest. Consider a longer time horizon or a higher return rate to maximize the compound effect.`
    );
  }

  // Rate-specific advice
  if (rate < 3) {
    insights.push(
      `At ${rate}% return, your money barely keeps up with inflation (~3%). Consider index funds (historically ~7-10% avg return) to grow your wealth faster.`
    );
  } else if (rate >= 3 && rate <= 7) {
    insights.push(
      `A ${rate}% return is reasonable for a balanced portfolio of bonds and stocks. If you can tolerate more risk, stock index funds have historically returned 7-10% annually.`
    );
  } else if (rate > 10) {
    insights.push(
      `A ${rate}% annual return is ambitious. The S&P 500 has averaged ~10% historically. Make sure your expectations are realistic and diversify your investments.`
    );
  }

  // Millionaire insight
  if (total < 1000000 && monthlyNeededFor1M < 5000) {
    insights.push(
      `To reach $1,000,000 in ${years} years at ${rate}%, you'd need to invest about ${formatMoney(monthlyNeededFor1M)}/month. ${monthlyNeededFor1M < monthly * 2 ? "You're closer than you think!" : ""}`
    );
  }

  // Time insight
  if (years < 10) {
    insights.push(
      `Pro tip: Extending your investment to 20+ years dramatically increases returns due to the exponential nature of compound growth.`
    );
  }

  return insights.join("\n\n");
}

export function CompoundInterestCalc() {
  const [principalStr, setPrincipal, principal] = useNumInput(10000);
  const [monthlyStr, setMonthly, monthly] = useNumInput(500);
  const [rateStr, setRate, rate] = useNumInput(7);
  const [yearsStr, setYears, years] = useNumInput(20);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const chartData = [];

    let balance = principal;
    let totalContributions = principal;

    for (let year = 0; year <= years; year++) {
      chartData.push({
        year: `Year ${year}`,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        interest: Math.round(balance - totalContributions),
      });

      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthly;
        totalContributions += monthly;
      }
    }

    const finalBalance = chartData[chartData.length - 1].balance;
    const finalContributions = chartData[chartData.length - 1].contributions;
    const totalInterest = finalBalance - finalContributions;

    return {
      total: finalBalance,
      totalContributions: finalContributions,
      totalInterest,
      chartData,
    };
  }, [principalStr, monthlyStr, rateStr, yearsStr]);

  const aiInsight = useMemo(
    () =>
      calculated
        ? generateAIInsight(
            principal,
            monthly,
            rate,
            years,
            results.total,
            results.totalContributions,
            results.totalInterest
          )
        : "",
    [calculated, principalStr, monthlyStr, rateStr, yearsStr, results]
  );

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Enter Your Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="principal" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Initial Investment
              </Label>
              <Input
                id="principal"
                type="text"
                inputMode="numeric"
                value={principalStr}
                onChange={(e) => setPrincipal(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Monthly Contribution
              </Label>
              <Input
                id="monthly"
                type="text"
                inputMode="numeric"
                value={monthlyStr}
                onChange={(e) => setMonthly(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate" className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" />
                Annual Interest Rate (%)
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
            <div className="space-y-2">
              <Label htmlFor="years" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                Time Period (Years)
              </Label>
              <Input
                id="years"
                type="text"
                inputMode="numeric"
                value={yearsStr}
                onChange={(e) => setYears(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate Compound Interest
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {calculated && (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Total Value</p>
                <p className="text-2xl font-bold text-emerald-800">
                  {formatMoney(results.total)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Contributions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatMoney(results.totalContributions)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Interest Earned</p>
                <p className="text-2xl font-bold text-blue-800">
                  {formatMoney(results.totalInterest)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 12 }}
                      interval={Math.max(0, Math.floor(years / 6))}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) =>
                        v >= 1000000
                          ? `$${(v / 1000000).toFixed(1)}M`
                          : `$${(v / 1000).toFixed(0)}K`
                      }
                    />
                    <Tooltip
                      formatter={(value) => formatMoney(Number(value))}
                      labelStyle={{ fontWeight: "bold" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="contributions"
                      stackId="1"
                      stroke="#94a3b8"
                      fill="#e2e8f0"
                      name="Contributions"
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      stackId="1"
                      stroke="#059669"
                      fill="#a7f3d0"
                      name="Interest Earned"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Insight */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  Smart Analysis
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" />
                AI insights are for educational purposes only. Not financial
                advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
