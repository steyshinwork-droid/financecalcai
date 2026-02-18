"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  DollarSign,
  Percent,
  Sparkles,
  Info,
  Plus,
  Trash2,
} from "lucide-react";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

function simulatePayoff(
  debts: Debt[],
  extraPayment: number,
  method: "avalanche" | "snowball"
): { months: number; totalInterest: number } {
  const remaining = debts.map((d) => ({ ...d, balance: d.balance }));
  let months = 0;
  let totalInterest = 0;
  const maxMonths = 600;

  while (remaining.some((d) => d.balance > 0) && months < maxMonths) {
    months++;

    // Sort by method
    const sorted = [...remaining].filter((d) => d.balance > 0);
    if (method === "avalanche") {
      sorted.sort((a, b) => b.rate - a.rate);
    } else {
      sorted.sort((a, b) => a.balance - b.balance);
    }

    let extra = extraPayment;

    for (const debt of remaining) {
      if (debt.balance <= 0) continue;

      const interest = debt.balance * (debt.rate / 100 / 12);
      totalInterest += interest;

      const isTarget = sorted[0]?.id === debt.id;
      const payment = debt.minPayment + (isTarget ? extra : 0);
      const actualPayment = Math.min(payment, debt.balance + interest);

      debt.balance = debt.balance + interest - actualPayment;
      if (debt.balance < 0.01) debt.balance = 0;
    }
  }

  return { months, totalInterest };
}

export function DebtPayoffCalc() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Credit Card", balance: 5000, rate: 22, minPayment: 100 },
    { id: "2", name: "Car Loan", balance: 15000, rate: 6, minPayment: 300 },
    { id: "3", name: "Student Loan", balance: 25000, rate: 5, minPayment: 250 },
  ]);
  const [extraPayment, setExtraPayment] = useState(200);
  const [calculated, setCalculated] = useState(false);

  const addDebt = () => {
    setDebts([
      ...debts,
      {
        id: Date.now().toString(),
        name: `Debt ${debts.length + 1}`,
        balance: 0,
        rate: 0,
        minPayment: 0,
      },
    ]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const results = useMemo(() => {
    if (!calculated) return null;
    const validDebts = debts.filter((d) => d.balance > 0);
    if (validDebts.length === 0) return null;

    const avalanche = simulatePayoff(validDebts, extraPayment, "avalanche");
    const snowball = simulatePayoff(validDebts, extraPayment, "snowball");
    const noExtra = simulatePayoff(validDebts, 0, "avalanche");

    const totalDebt = validDebts.reduce((s, d) => s + d.balance, 0);

    return { avalanche, snowball, noExtra, totalDebt };
  }, [calculated, debts, extraPayment]);

  const aiInsight = useMemo(() => {
    if (!results) return "";
    const insights: string[] = [];

    const savings = results.noExtra.totalInterest - results.avalanche.totalInterest;
    const monthsSaved = results.noExtra.months - results.avalanche.months;

    insights.push(
      `You have ${formatMoney(results.totalDebt)} in total debt. With ${formatMoney(extraPayment)}/month extra, you'll be debt-free in ${results.avalanche.months} months (${(results.avalanche.months / 12).toFixed(1)} years) using the avalanche method — that's ${monthsSaved} months faster than minimum payments only.`
    );

    if (results.avalanche.totalInterest < results.snowball.totalInterest) {
      const diff = results.snowball.totalInterest - results.avalanche.totalInterest;
      insights.push(
        `The Avalanche method (highest rate first) saves you ${formatMoney(diff)} compared to Snowball. However, Snowball gives faster small wins — choose based on what keeps you motivated.`
      );
    } else {
      insights.push(
        `Both methods cost about the same for your debts. Go with Snowball — the quick wins from paying off smaller debts first will keep you motivated.`
      );
    }

    insights.push(
      `By paying extra, you'll save ${formatMoney(savings)} in interest compared to minimum payments only. Every extra dollar you can put toward debt accelerates your freedom.`
    );

    const highRateDebt = debts.reduce((max, d) => (d.rate > max.rate ? d : max), debts[0]);
    if (highRateDebt.rate > 15) {
      insights.push(
        `Priority: "${highRateDebt.name}" at ${highRateDebt.rate}% is very expensive debt. Focus all extra payments here first (avalanche method). Consider a balance transfer to a 0% introductory rate card if eligible.`
      );
    }

    return insights.join("\n\n");
  }, [results, extraPayment, debts]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-red-600" />
            Enter Your Debts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {debts.map((debt, i) => (
            <div
              key={debt.id}
              className="mb-4 rounded-lg border bg-gray-50 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <Input
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                  className="max-w-[200px] border-none bg-transparent text-sm font-semibold"
                />
                {debts.length > 1 && (
                  <button
                    onClick={() => removeDebt(debt.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <DollarSign className="h-3 w-3" /> Balance
                  </Label>
                  <Input
                    type="number"
                    value={debt.balance}
                    onChange={(e) =>
                      updateDebt(debt.id, "balance", Number(e.target.value))
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <Percent className="h-3 w-3" /> Interest Rate (%)
                  </Label>
                  <Input
                    type="number"
                    value={debt.rate}
                    onChange={(e) =>
                      updateDebt(debt.id, "rate", Number(e.target.value))
                    }
                    min={0}
                    step={0.5}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-1 text-xs">
                    <DollarSign className="h-3 w-3" /> Min Payment
                  </Label>
                  <Input
                    type="number"
                    value={debt.minPayment}
                    onChange={(e) =>
                      updateDebt(debt.id, "minPayment", Number(e.target.value))
                    }
                    min={0}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addDebt} className="mb-6 w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Another Debt
          </Button>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label htmlFor="extra" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
              Extra Monthly Payment (on top of minimums)
            </Label>
            <Input
              id="extra"
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              min={0}
              step={50}
            />
          </div>

          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate Payoff Plan
          </Button>
        </CardContent>
      </Card>

      {results && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Debt</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatMoney(results.totalDebt)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">
                  Debt-Free In (Avalanche)
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {results.avalanche.months} months
                </p>
                <p className="text-xs text-emerald-600">
                  Interest: {formatMoney(results.avalanche.totalInterest)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">
                  Debt-Free In (Snowball)
                </p>
                <p className="text-2xl font-bold text-blue-800">
                  {results.snowball.months} months
                </p>
                <p className="text-xs text-blue-600">
                  Interest: {formatMoney(results.snowball.totalInterest)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  Payoff Strategy
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
