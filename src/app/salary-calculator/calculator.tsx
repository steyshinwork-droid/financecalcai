"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Clock, Sparkles, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SaveCalculationButton } from "@/components/save-calculation-button";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

type Period = "hourly" | "daily" | "weekly" | "biweekly" | "monthly" | "annual";

const PERIODS: { key: Period; label: string }[] = [
  { key: "hourly", label: "Hourly" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "biweekly", label: "Bi-Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "annual", label: "Annual" },
];

function toAnnual(amount: number, period: Period, hoursPerWeek: number): number {
  switch (period) {
    case "hourly": return amount * hoursPerWeek * 52;
    case "daily": return amount * 5 * 52;
    case "weekly": return amount * 52;
    case "biweekly": return amount * 26;
    case "monthly": return amount * 12;
    case "annual": return amount;
  }
}

function fromAnnual(annual: number, period: Period, hoursPerWeek: number): number {
  switch (period) {
    case "hourly": return annual / (hoursPerWeek * 52);
    case "daily": return annual / (5 * 52);
    case "weekly": return annual / 52;
    case "biweekly": return annual / 26;
    case "monthly": return annual / 12;
    case "annual": return annual;
  }
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}

export function SalaryCalc() {
  const [amountStr, setAmount, amount] = useNumInput(25);
  const [period, setPeriod] = useState<Period>("hourly");
  const [hoursStr, setHours, hours] = useNumInput(40);

  const annual = useMemo(() => toAnnual(amount, period, hours || 40), [amountStr, period, hoursStr]);

  const breakdown = useMemo(() => ({
    hourly: fromAnnual(annual, "hourly", hours || 40),
    daily: fromAnnual(annual, "daily", hours || 40),
    weekly: fromAnnual(annual, "weekly", hours || 40),
    biweekly: fromAnnual(annual, "biweekly", hours || 40),
    monthly: fromAnnual(annual, "monthly", hours || 40),
    annual,
  }), [annual, hoursStr]);

  const aiInsight = useMemo(() => {
    const hourly = breakdown.hourly;
    const parts: string[] = [];

    if (hourly < 15) {
      parts.push(`At ${fmt(hourly)}/hour, this is below the federal minimum wage ($7.25/hr) or near the minimum in many states. Many states and cities have set minimums of $15–$17/hour.`);
    } else if (hourly < 25) {
      parts.push(`At ${fmt(hourly)}/hour (${fmt(annual)}/year), you're earning near the US median individual income. The US median annual wage is approximately $59,000.`);
    } else if (hourly < 50) {
      parts.push(`At ${fmt(hourly)}/hour (${fmt(annual)}/year), you're earning above the US median. The top 25% of earners make over $80,000/year.`);
    } else {
      parts.push(`At ${fmt(hourly)}/hour (${fmt(annual)}/year), you're in the top income tier. Only about 10% of US workers earn over $100,000/year.`);
    }

    const takeHome = annual * 0.72;
    parts.push(`Estimated take-home pay (after ~28% effective tax rate for this income level): ${fmt(takeHome / 12)}/month or ${fmt(takeHome)}/year. Actual amount depends on your filing status, state, and deductions.`);

    return parts.join("\n\n");
  }, [breakdown, annual]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enter Your Salary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" /> Amount
            </Label>
            <Input
              type="text"
              inputMode="decimal"
              value={amountStr}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Pay Period</Label>
            <div className="flex flex-wrap gap-2">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                    period === p.key
                      ? "border-teal-500 bg-teal-500 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-teal-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {(period === "hourly" || period === "daily") && (
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-400" /> Hours per Week
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={hoursStr}
                onChange={(e) => setHours(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="max-w-[120px]"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-800">Salary Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: "Hourly", value: breakdown.hourly },
              { label: "Daily (8h)", value: breakdown.daily },
              { label: "Weekly", value: breakdown.weekly },
              { label: "Bi-Weekly", value: breakdown.biweekly },
              { label: "Monthly", value: breakdown.monthly },
              { label: "Annual", value: breakdown.annual },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                <span className="text-sm text-gray-600">{row.label}</span>
                <span className="font-bold text-gray-900">{fmt(row.value)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <SaveCalculationButton
          calculatorType="salary"
          title={`$${amount} ${period} → $${Math.round(breakdown.annual).toLocaleString()}/yr`}
          inputs={{ amount, period, hoursPerWeek: hours }}
          results={{ annual: Math.round(breakdown.annual), monthly: Math.round(breakdown.monthly), hourly: parseFloat(breakdown.hourly.toFixed(2)) }}
        />
      </div>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">Salary Analysis</Badge>
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
            <Info className="h-3 w-3" /> Based on US income data. Tax estimate is approximate.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
