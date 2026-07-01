"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Percent, Sparkles, Info, HeartPulse, AlertTriangle } from "lucide-react";
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

const LIMITS_2025 = { individual: 4300, family: 8550, catchUp: 1000 };

export function HsaCalc() {
  const [coverage, setCoverage] = useState<"individual" | "family">("individual");
  const [ageStr, setAge, age] = useNumInput(30);
  const [retireAgeStr, setRetireAge, retireAge] = useNumInput(65);
  const [currentBalanceStr, setCurrentBalance, currentBalance] = useNumInput(5000);
  const [yourContributionStr, setYourContribution, yourContribution] = useNumInput(3000);
  const [employerContributionStr, setEmployerContribution, employerContribution] = useNumInput(1000);
  const [rateStr, setRate, rate] = useNumInput(7);
  const [taxRateStr, setTaxRate, taxRate] = useNumInput(24);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const years = Math.max(0, Math.round(retireAge - age));
    const annualContribution = yourContribution + employerContribution;
    const limit = LIMITS_2025[coverage] + (age >= 55 ? LIMITS_2025.catchUp : 0);
    const overLimit = annualContribution > limit;

    let balance = currentBalance;
    const chartData: { age: number; balance: number }[] = [];
    for (let y = 0; y <= years; y++) {
      chartData.push({ age: age + y, balance: Math.round(balance) });
      balance = balance * (1 + rate / 100) + annualContribution;
    }

    const futureBalance = chartData.length ? chartData[chartData.length - 1].balance : currentBalance;
    const totalContributions = currentBalance + annualContribution * years;
    const totalGrowth = futureBalance - totalContributions;
    const totalTaxSavings = yourContribution * years * (taxRate / 100 + 0.0765);

    return {
      years,
      annualContribution,
      limit,
      overLimit,
      futureBalance,
      totalContributions,
      totalGrowth,
      totalTaxSavings,
      chartData,
    };
  }, [ageStr, retireAgeStr, currentBalanceStr, yourContributionStr, employerContributionStr, rateStr, taxRateStr, coverage, age, retireAge, currentBalance, yourContribution, employerContribution, rate, taxRate]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];
    const { futureBalance, totalGrowth, totalTaxSavings, overLimit, limit, years } = results;

    insights.push(
      `By age ${retireAge}, your HSA could grow to ${formatMoney(futureBalance)} — with ${formatMoney(totalGrowth)} of that coming from tax-free investment growth alone. An HSA is the only account with a triple tax advantage: contributions are pre-tax, growth is tax-free, and withdrawals for qualified medical expenses are never taxed.`
    );

    if (overLimit) {
      insights.push(
        `Your combined contribution of ${formatMoney(results.annualContribution)}/year exceeds the 2025 IRS limit of ${formatMoney(limit)} for your coverage type. Excess HSA contributions are subject to a 6% excise tax every year they remain in the account — reduce your contribution or withdraw the excess before the tax filing deadline.`
      );
    } else {
      const room = limit - results.annualContribution;
      if (room > 200) {
        insights.push(
          `You have ${formatMoney(room)}/year of unused HSA contribution room. If you can afford it, maxing out your HSA before your 401(k) beyond the match is one of the best tax moves available — no other account beats its triple tax advantage.`
        );
      }
    }

    if (years > 15 && totalTaxSavings > 0) {
      insights.push(
        `Over ${years} years, your own contributions alone will save you roughly ${formatMoney(totalTaxSavings)} in combined income and payroll taxes. If you can afford to pay current medical bills out of pocket instead of from the HSA, letting the balance invest and compound untouched dramatically increases its value by retirement.`
      );
    }

    insights.push(
      `After age 65, HSA withdrawals for non-medical expenses are taxed like a traditional IRA — no penalty, just ordinary income tax. That makes an HSA a legitimate stealth retirement account even if you never use it for healthcare.`
    );

    return insights.join("\n\n");
  }, [calculated, results, retireAge]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HeartPulse className="h-5 w-5 text-green-600" /> Your HSA Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2">
            <Label>Coverage Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={coverage === "individual" ? "default" : "outline"}
                className={coverage === "individual" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setCoverage("individual")}
              >
                Individual
              </Button>
              <Button
                type="button"
                variant={coverage === "family" ? "default" : "outline"}
                className={coverage === "family" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setCoverage("family")}
              >
                Family
              </Button>
            </div>
          </div>
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
                <Calendar className="h-4 w-4 text-gray-400" /> Retirement Age
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={retireAgeStr}
                onChange={(e) => setRetireAge(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Current HSA Balance
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
                <DollarSign className="h-4 w-4 text-gray-400" /> Your Annual Contribution
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={yourContributionStr}
                onChange={(e) => setYourContribution(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Employer Annual Contribution
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={employerContributionStr}
                onChange={(e) => setEmployerContribution(e.target.value)}
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
                <Percent className="h-4 w-4 text-gray-400" /> Marginal Tax Rate (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={taxRateStr}
                onChange={(e) => setTaxRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-green-600 hover:bg-green-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate My HSA Growth
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          {results.overLimit && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Your combined contribution of {formatMoney(results.annualContribution)}/year exceeds the 2025 IRS
                limit of {formatMoney(results.limit)} for {coverage} coverage
                {age >= 55 ? " (including your $1,000 catch-up)" : ""}. Excess contributions face a 6% excise tax
                each year until corrected.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-green-700">HSA Balance at {retireAge}</p>
                <p className="text-2xl font-bold text-green-900">{formatMoney(results.futureBalance)}</p>
                <p className="text-xs text-green-600">{results.years} years of growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Contributions</p>
                <p className="text-2xl font-bold">{formatMoney(results.totalContributions)}</p>
                <p className="text-xs text-gray-400">balance + contributions</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Tax-Free Growth</p>
                <p className="text-2xl font-bold text-emerald-900">{formatMoney(results.totalGrowth)}</p>
                <p className="text-xs text-emerald-600">never taxed if used for medical costs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Tax Savings on Contributions</p>
                <p className="text-2xl font-bold">{formatMoney(results.totalTaxSavings)}</p>
                <p className="text-xs text-gray-400">income + payroll tax saved</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">HSA Balance Growth Over Time</CardTitle>
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
                      formatter={(value) => [formatMoney(Number(value)), "HSA Balance"]}
                      labelFormatter={(l) => `Age ${l}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#16a34a"
                      fill="#f0fdf4"
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
              calculatorType="hsa"
              title={`HSA balance at ${retireAge}: ${formatMoney(results.futureBalance)}`}
              inputs={{ coverage, age, retireAge, currentBalance, yourContribution, employerContribution, rate, taxRate }}
              results={{
                futureBalance: Math.round(results.futureBalance),
                totalContributions: Math.round(results.totalContributions),
                totalGrowth: Math.round(results.totalGrowth),
                totalTaxSavings: Math.round(results.totalTaxSavings),
              }}
            />
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">HSA Analysis</Badge>
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
