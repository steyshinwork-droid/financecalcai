"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Users, Sparkles, Info, Heart, AlertTriangle } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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

export function LifeInsuranceCalc() {
  const [annualIncomeStr, setAnnualIncome, annualIncome] = useNumInput(60000);
  const [yearsToReplaceStr, setYearsToReplace, yearsToReplace] = useNumInput(10);
  const [debtStr, setDebt, debt] = useNumInput(8000);
  const [mortgageBalanceStr, setMortgageBalance, mortgageBalance] = useNumInput(220000);
  const [numChildrenStr, setNumChildren, numChildren] = useNumInput(1);
  const [costPerChildStr, setCostPerChild, costPerChild] = useNumInput(100000);
  const [existingSavingsStr, setExistingSavings, existingSavings] = useNumInput(15000);
  const [existingCoverageStr, setExistingCoverage, existingCoverage] = useNumInput(50000);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const incomeReplacement = annualIncome * yearsToReplace;
    const educationTotal = numChildren * costPerChild;
    const grossNeed = debt + incomeReplacement + mortgageBalance + educationTotal;
    const existingAssets = existingSavings + existingCoverage;
    const netNeed = Math.max(0, grossNeed - existingAssets);
    const incomeMultipleRule = annualIncome * 10;

    const chartData = [
      { name: "Debt", value: debt, fill: "#f87171" },
      { name: "Income", value: incomeReplacement, fill: "#60a5fa" },
      { name: "Mortgage", value: mortgageBalance, fill: "#fbbf24" },
      { name: "Education", value: educationTotal, fill: "#34d399" },
    ];

    return {
      incomeReplacement,
      educationTotal,
      grossNeed,
      existingAssets,
      netNeed,
      incomeMultipleRule,
      chartData,
    };
  }, [annualIncome, yearsToReplace, debt, mortgageBalance, numChildren, costPerChild, existingSavings, existingCoverage]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];
    const { netNeed, grossNeed, existingAssets, incomeMultipleRule } = results;

    insights.push(
      `Based on the DIME method (Debt + Income replacement + Mortgage + Education), your household would need roughly ${formatMoney(netNeed)} in life insurance coverage — that's ${formatMoney(grossNeed)} in total needs minus ${formatMoney(existingAssets)} in existing savings and coverage you already have.`
    );

    if (Math.abs(netNeed - incomeMultipleRule) > incomeMultipleRule * 0.25) {
      insights.push(
        `This is notably different from the simpler "10x income" rule of thumb (${formatMoney(incomeMultipleRule)}). DIME tends to be more accurate for your specific situation since it accounts for your actual mortgage, debts, and number of children rather than a flat multiple.`
      );
    } else {
      insights.push(
        `That's fairly close to the simpler "10x income" rule of thumb (${formatMoney(incomeMultipleRule)}), which is a reasonable cross-check for your number.`
      );
    }

    insights.push(
      `A 20-30 year level term life insurance policy is almost always the cheapest way to cover this need — a healthy 35-year-old can often get $500,000-$1,000,000 in coverage for $20-40/month. Whole life insurance costs 10-15x more for the same coverage and is rarely the right tool purely for income replacement.`
    );

    insights.push(
      `Re-run this calculation after major life events — a new child, paying off the mortgage, or a significant income change — since your coverage need shifts with each of these.`
    );

    return insights.join("\n\n");
  }, [calculated, results]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-gray-600" /> Your Household Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Annual Income
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={annualIncomeStr}
                onChange={(e) => setAnnualIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Years of Income to Replace
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={yearsToReplaceStr}
                onChange={(e) => setYearsToReplace(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Non-Mortgage Debt
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={debtStr}
                onChange={(e) => setDebt(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Remaining Mortgage Balance
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={mortgageBalanceStr}
                onChange={(e) => setMortgageBalance(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-400" /> Number of Children
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={numChildrenStr}
                onChange={(e) => setNumChildren(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Education Cost per Child
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={costPerChildStr}
                onChange={(e) => setCostPerChild(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Existing Savings/Investments
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={existingSavingsStr}
                onChange={(e) => setExistingSavings(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Existing Life Insurance Coverage
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={existingCoverageStr}
                onChange={(e) => setExistingCoverage(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-gray-700 hover:bg-gray-800 text-white"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate My Life Insurance Need
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
            <p>
              This is an estimate using the DIME method, a standard framework for sizing life insurance need. It's a starting point for shopping term life quotes, not a guarantee or professional recommendation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gray-300 bg-gray-50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Recommended Coverage</p>
                <p className="text-2xl font-bold text-gray-900">{formatMoney(results.netNeed)}</p>
                <p className="text-xs text-gray-500">net of existing assets</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Household Need (DIME)</p>
                <p className="text-2xl font-bold">{formatMoney(results.grossNeed)}</p>
                <p className="text-xs text-gray-400">before existing assets</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Existing Savings + Coverage</p>
                <p className="text-2xl font-bold">{formatMoney(results.existingAssets)}</p>
                <p className="text-xs text-gray-400">already in place</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">10x Income Rule (Cross-Check)</p>
                <p className="text-2xl font-bold">{formatMoney(results.incomeMultipleRule)}</p>
                <p className="text-xs text-gray-400">simple rule of thumb</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">DIME Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) =>
                        v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`
                      }
                    />
                    <Tooltip formatter={(value) => [formatMoney(Number(value)), "Amount"]} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {results.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="life-insurance"
              title={`Recommended coverage: ${formatMoney(results.netNeed)}`}
              inputs={{ annualIncome, yearsToReplace, debt, mortgageBalance, numChildren, costPerChild, existingSavings, existingCoverage }}
              results={{
                netNeed: Math.round(results.netNeed),
                grossNeed: Math.round(results.grossNeed),
                existingAssets: Math.round(results.existingAssets),
              }}
            />
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Life Insurance Analysis</Badge>
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
                <Info className="h-3 w-3" /> Estimate for planning purposes only. Not financial, tax, or insurance advice.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
