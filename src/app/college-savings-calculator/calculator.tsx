"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Percent, Sparkles, Info, BookOpen, AlertTriangle } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
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

export function CollegeSavingsCalc() {
  const [childAgeStr, setChildAge, childAge] = useNumInput(5);
  const [startAgeStr, setStartAge, startAge] = useNumInput(18);
  const [currentBalanceStr, setCurrentBalance, currentBalance] = useNumInput(5000);
  const [monthlyContributionStr, setMonthlyContribution, monthlyContribution] = useNumInput(200);
  const [rateStr, setRate, rate] = useNumInput(6);
  const [annualCostStr, setAnnualCost, annualCost] = useNumInput(24000);
  const [costInflationStr, setCostInflation, costInflation] = useNumInput(5);
  const [yearsInCollegeStr, setYearsInCollege, yearsInCollege] = useNumInput(4);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const yearsToCollege = Math.max(0, Math.round(startAge - childAge));
    const annualContribution = monthlyContribution * 12;

    let balance = currentBalance;
    const chartData: { age: number; balance: number }[] = [];
    for (let y = 0; y <= yearsToCollege; y++) {
      chartData.push({ age: childAge + y, balance: Math.round(balance) });
      balance = balance * (1 + rate / 100) + annualContribution;
    }
    const balanceAtCollege = chartData.length ? chartData[chartData.length - 1].balance : currentBalance;
    const totalContributions = currentBalance + annualContribution * yearsToCollege;
    const totalGrowth = balanceAtCollege - totalContributions;

    const inflatedFirstYearCost = annualCost * Math.pow(1 + costInflation / 100, yearsToCollege);
    let totalCollegeCost = 0;
    let costYear = inflatedFirstYearCost;
    for (let y = 0; y < yearsInCollege; y++) {
      totalCollegeCost += costYear;
      costYear = costYear * (1 + costInflation / 100);
    }

    const gap = totalCollegeCost - balanceAtCollege;
    const covered = totalCollegeCost > 0 ? Math.min(100, (balanceAtCollege / totalCollegeCost) * 100) : 100;

    let requiredMonthly = monthlyContribution;
    if (gap > 0 && yearsToCollege > 0) {
      const monthlyRate = rate / 100 / 12;
      const months = yearsToCollege * 12;
      const fvOfCurrentBalance = currentBalance * Math.pow(1 + rate / 100, yearsToCollege);
      const neededFromContributions = totalCollegeCost - fvOfCurrentBalance;
      if (monthlyRate > 0) {
        requiredMonthly = neededFromContributions / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      } else {
        requiredMonthly = neededFromContributions / months;
      }
      requiredMonthly = Math.max(0, requiredMonthly);
    }

    return {
      yearsToCollege,
      annualContribution,
      balanceAtCollege,
      totalContributions,
      totalGrowth,
      totalCollegeCost,
      gap,
      covered,
      requiredMonthly,
      chartData,
    };
  }, [childAgeStr, startAgeStr, currentBalanceStr, monthlyContributionStr, rateStr, annualCostStr, costInflationStr, yearsInCollegeStr, childAge, startAge, currentBalance, monthlyContribution, rate, annualCost, costInflation, yearsInCollege]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];
    const { balanceAtCollege, totalCollegeCost, gap, covered, requiredMonthly, yearsToCollege } = results;

    insights.push(
      `By age ${startAge}, your 529 plan could grow to ${formatMoney(balanceAtCollege)} against an estimated total college cost of ${formatMoney(totalCollegeCost)} — covering roughly ${covered.toFixed(0)}% of the bill.`
    );

    if (gap > 0) {
      insights.push(
        `You're on pace for a shortfall of about ${formatMoney(gap)}. To close that gap by age ${startAge}, you'd need to contribute roughly ${formatMoney(Math.round(requiredMonthly))}/month instead of your current amount — or plan to cover the rest with financial aid, scholarships, or student loans.`
      );
    } else {
      insights.push(
        `You're on track to fully cover the projected cost, with a projected surplus of ${formatMoney(Math.abs(gap))}. Any extra can stay invested for future costs like books, housing, or grad school.`
      );
    }

    insights.push(
      `529 plan earnings grow tax-free, and withdrawals are tax-free when used for qualified education expenses — tuition, room and board, books, and up to $10,000/year in K-12 tuition. Many states also offer a tax deduction or credit for contributions.`
    );

    if (yearsToCollege > 10) {
      insights.push(
        `With ${yearsToCollege} years until college, consider an age-based investment portfolio within the 529 — most plans automatically shift from growth-focused to conservative allocations as your child approaches enrollment, similar to a target-date fund.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, startAge]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-yellow-600" /> Your College Savings Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Child's Current Age
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={childAgeStr}
                onChange={(e) => setChildAge(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Age College Starts
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={startAgeStr}
                onChange={(e) => setStartAge(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Current 529 Balance
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={currentBalanceStr}
                onChange={(e) => setCurrentBalance(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Monthly Contribution
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
                <DollarSign className="h-4 w-4 text-gray-400" /> College Cost Today (per year)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={annualCostStr}
                onChange={(e) => setAnnualCost(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> College Cost Inflation (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={costInflationStr}
                onChange={(e) => setCostInflation(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Years in College
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={yearsInCollegeStr}
                onChange={(e) => setYearsInCollege(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-yellow-950"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate My College Savings Plan
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          {results.gap > 0 && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Projected shortfall of {formatMoney(results.gap)} against total estimated college costs of{" "}
                {formatMoney(results.totalCollegeCost)}. Consider increasing your monthly contribution to roughly{" "}
                {formatMoney(Math.round(results.requiredMonthly))}/month to close the gap.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <p className="text-sm text-yellow-700">529 Balance at {startAge}</p>
                <p className="text-2xl font-bold text-yellow-900">{formatMoney(results.balanceAtCollege)}</p>
                <p className="text-xs text-yellow-600">{results.yearsToCollege} years of growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total College Cost</p>
                <p className="text-2xl font-bold">{formatMoney(results.totalCollegeCost)}</p>
                <p className="text-xs text-gray-400">inflation-adjusted, all years</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Tax-Free Growth</p>
                <p className="text-2xl font-bold text-emerald-900">{formatMoney(results.totalGrowth)}</p>
                <p className="text-xs text-emerald-600">never taxed for qualified expenses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Percent of Cost Covered</p>
                <p className="text-2xl font-bold">{results.covered.toFixed(0)}%</p>
                <p className="text-xs text-gray-400">at your current contribution rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">529 Balance Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="age" tick={{ fontSize: 12 }} label={{ value: "Child's Age", position: "insideBottom", offset: -2 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) =>
                        v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [formatMoney(Number(value)), "529 Balance"]}
                      labelFormatter={(l) => `Age ${l}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#d97706"
                      fill="#fefce8"
                      strokeWidth={2}
                      name="balance"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="college-savings"
              title={`529 balance at age ${startAge}: ${formatMoney(results.balanceAtCollege)}`}
              inputs={{ childAge, startAge, currentBalance, monthlyContribution, rate, annualCost, costInflation, yearsInCollege }}
              results={{
                balanceAtCollege: Math.round(results.balanceAtCollege),
                totalCollegeCost: Math.round(results.totalCollegeCost),
                totalGrowth: Math.round(results.totalGrowth),
                gap: Math.round(results.gap),
              }}
            />
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">College Savings Analysis</Badge>
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
                <Info className="h-3 w-3" /> Projections assume constant returns and contributions. Actual results will vary. Not financial or tax advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
