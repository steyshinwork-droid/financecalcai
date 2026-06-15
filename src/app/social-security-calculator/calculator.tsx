"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Sparkles, Info, Shield, Users } from "lucide-react";
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

function calcSSBenefit(annualIncome: number, yearsWorked: number, claimAge: number): number {
  const effectiveYears = Math.min(yearsWorked, 35);
  const aime = (annualIncome / 12) * (effectiveYears / 35);

  // 2025 bend points
  const bp1 = 1226;
  const bp2 = 7391;

  let pia = 0;
  if (aime <= bp1) {
    pia = aime * 0.9;
  } else if (aime <= bp2) {
    pia = bp1 * 0.9 + (aime - bp1) * 0.32;
  } else {
    pia = bp1 * 0.9 + (bp2 - bp1) * 0.32 + (aime - bp2) * 0.15;
  }

  // FRA = 67 for born 1960+
  const fra = 67;
  let factor = 1.0;

  if (claimAge < fra) {
    const monthsEarly = (fra - claimAge) * 12;
    // First 36 months: 5/9 of 1% per month; beyond 36 months: 5/12 of 1% per month
    if (monthsEarly <= 36) {
      factor = 1 - (monthsEarly * 5) / 900;
    } else {
      factor = 1 - (36 * 5) / 900 - ((monthsEarly - 36) * 5) / 1200;
    }
  } else if (claimAge > fra) {
    const monthsLate = (claimAge - fra) * 12;
    factor = 1 + (monthsLate * 8) / 1200;
  }

  return Math.round(pia * factor);
}

const CLAIM_AGES = [62, 63, 64, 65, 66, 67, 68, 69, 70];

export function SocialSecurityCalc() {
  const [ageStr, setAge, age] = useNumInput(45);
  const [incomeStr, setIncome, income] = useNumInput(65000);
  const [yearsStr, setYears, years] = useNumInput(20);
  const [claimAge, setClaimAge] = useState(67);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const benefits = CLAIM_AGES.map((a) => ({
      age: `Age ${a}`,
      claimAge: a,
      monthly: calcSSBenefit(income, years, a),
    }));

    const selectedBenefit = calcSSBenefit(income, years, claimAge);
    const at67 = calcSSBenefit(income, years, 67);
    const at62 = calcSSBenefit(income, years, 62);
    const at70 = calcSSBenefit(income, years, 70);

    // Breakeven: how many months to recoup the difference between claiming at 62 vs 67
    const earlyMonths = (67 - 62) * 12;
    const earlyTotal = at62 * earlyMonths;
    const monthlyDiff67vs62 = at67 - at62;
    const breakeven6267 = monthlyDiff67vs62 > 0 ? Math.round(earlyTotal / monthlyDiff67vs62) : 0;
    const breakevenAge6267 = breakeven6267 > 0 ? (67 + breakeven6267 / 12).toFixed(1) : null;

    const earlyMonths70 = (70 - 67) * 12;
    const earlyTotal70 = at67 * earlyMonths70;
    const monthlyDiff70vs67 = at70 - at67;
    const breakeven6770 = monthlyDiff70vs67 > 0 ? Math.round(earlyTotal70 / monthlyDiff70vs67) : 0;
    const breakevenAge6770 = breakeven6770 > 0 ? (70 + breakeven6770 / 12).toFixed(1) : null;

    return {
      benefits,
      selectedBenefit,
      at62,
      at67,
      at70,
      breakevenAge6267,
      breakevenAge6770,
    };
  }, [incomeStr, yearsStr, claimAge]);

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const { selectedBenefit, at62, at67, at70, breakevenAge6267, breakevenAge6770 } = results;
    const insights: string[] = [];

    insights.push(
      `Based on ${years} years of work and a $${income.toLocaleString()} annual income, your estimated Social Security benefit is ${formatMoney(selectedBenefit)}/month at age ${claimAge} (${formatMoney(selectedBenefit * 12)}/year). This estimate uses the SSA's bend-point formula with 2025 values — your actual benefit may vary.`
    );

    if (breakevenAge6267) {
      insights.push(
        `Claiming at 62 vs. 67: You'd collect ${formatMoney(at62)}/month early but permanently lock in a lower payment. Waiting until 67 gives you ${formatMoney(at67)}/month — the breakeven point is around age ${breakevenAge6267}. If you live past that age, delaying pays off. Average US life expectancy is ~79 for men and ~83 for women.`
      );
    }

    if (breakevenAge6770) {
      insights.push(
        `Delaying to 70 maxes out your benefit at ${formatMoney(at70)}/month — ${formatMoney(at70 - at67)} more than at 67. The breakeven vs. claiming at 67 is around age ${breakevenAge6770}. Delaying to 70 is best for those in good health, have other income sources to cover ages 67–70, or want to maximize spousal survivor benefits.`
      );
    }

    if (years < 35) {
      insights.push(
        `You currently have ${years} years of work history. Social Security uses your 35 highest-earning years — zero-income years count as $0 and lower your average. Each additional year you work typically replaces a zero (or low-income year), meaningfully increasing your benefit.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, income, years, claimAge]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-cyan-600" /> Your Information
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
                placeholder="45"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Current Annual Income ($)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={incomeStr}
                onChange={(e) => setIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="65000"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-400" /> Years Worked So Far
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={yearsStr}
                onChange={(e) => setYears(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="20"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Planned Claiming Age
              </Label>
              <select
                value={claimAge}
                onChange={(e) => setClaimAge(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {CLAIM_AGES.map((a) => (
                  <option key={a} value={a}>
                    Age {a}{a === 67 ? " (Full Retirement Age)" : a === 62 ? " (Earliest)" : a === 70 ? " (Maximum)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate My Benefits
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-cyan-200 bg-cyan-50">
              <CardContent className="pt-6">
                <p className="text-sm text-cyan-700">Your Benefit at Age {claimAge}</p>
                <p className="text-2xl font-bold text-cyan-900">
                  {formatMoney(results.selectedBenefit)}/mo
                </p>
                <p className="mt-1 text-sm text-cyan-700">
                  {formatMoney(results.selectedBenefit * 12)}/year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Earliest (Age 62)</p>
                <p className="text-xl font-bold">{formatMoney(results.at62)}/mo</p>
                <p className="mt-1 text-xs text-gray-400">Reduced by ~30%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Maximum (Age 70)</p>
                <p className="text-xl font-bold">{formatMoney(results.at70)}/mo</p>
                <p className="mt-1 text-xs text-gray-400">+24% beyond FRA</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Benefit by Claiming Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.benefits} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" tick={{ fontSize: 11 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(1)}K`}
                    />
                    <Tooltip formatter={(value) => [formatMoney(Number(value)), "Monthly Benefit"]} />
                    <Bar dataKey="monthly" radius={[4, 4, 0, 0]}>
                      {results.benefits.map((entry) => (
                        <Cell
                          key={entry.claimAge}
                          fill={entry.claimAge === claimAge ? "#0891b2" : "#a5f3fc"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Breakeven Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
                  <p className="text-sm font-medium text-cyan-800">Claim at 62 vs. 67</p>
                  <p className="mt-2 text-2xl font-bold text-cyan-900">Age {results.breakevenAge6267 ?? "—"}</p>
                  <p className="mt-1 text-xs text-cyan-700">
                    Waiting until 67 pays off if you live past this age
                  </p>
                </div>
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-700">Claim at 67 vs. 70</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">Age {results.breakevenAge6770 ?? "—"}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Delaying to 70 pays off if you live past this age
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Social Security Analysis
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
                <Info className="h-3 w-3" /> Estimates use the SSA bend-point formula with 2025 values. For your official estimate, visit ssa.gov.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
