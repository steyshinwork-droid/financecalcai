"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Percent, Sparkles, Info, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function calcGrowth(initial: number, monthly: number, rate: number, years: number) {
  const monthlyRate = rate / 100 / 12;
  let balance = initial;
  const data = [];
  for (let y = 0; y <= years; y++) {
    data.push({ year: y, balance: Math.round(balance) });
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
    }
  }
  return { finalBalance: data[data.length - 1].balance, data };
}

export function InvestmentCalc() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(20);
  const [calculated, setCalculated] = useState(false);

  const scenarios = useMemo(() => {
    const conservative = calcGrowth(initial, monthly, 5, years);
    const moderate = calcGrowth(initial, monthly, 7, years);
    const aggressive = calcGrowth(initial, monthly, 10, years);
    const savings = calcGrowth(initial, monthly, 4.5, years);

    const chartData = Array.from({ length: years + 1 }, (_, i) => ({
      year: `Year ${i}`,
      "High-Yield Savings (4.5%)": savings.data[i].balance,
      "Conservative (5%)": conservative.data[i].balance,
      "Moderate (7%)": moderate.data[i].balance,
      "Aggressive (10%)": aggressive.data[i].balance,
    }));

    return { conservative, moderate, aggressive, savings, chartData };
  }, [initial, monthly, years]);

  const totalContributed = initial + monthly * 12 * years;

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];

    const moderateReturn = scenarios.moderate.finalBalance - totalContributed;
    const aggressiveReturn = scenarios.aggressive.finalBalance - totalContributed;

    insights.push(
      `With ${formatMoney(initial)} initial + ${formatMoney(monthly)}/month over ${years} years, your total contributions will be ${formatMoney(totalContributed)}. A moderate portfolio (7%) would grow this to ${formatMoney(scenarios.moderate.finalBalance)} — earning ${formatMoney(moderateReturn)} in returns.`
    );

    insights.push(
      `The difference between strategies is dramatic: Conservative earns ${formatMoney(scenarios.conservative.finalBalance - totalContributed)}, while Aggressive earns ${formatMoney(aggressiveReturn)}. That's a ${formatMoney(aggressiveReturn - (scenarios.conservative.finalBalance - totalContributed))} difference — but comes with more volatility and risk.`
    );

    if (years >= 15) {
      insights.push(
        `With a ${years}-year horizon, you can afford more risk. Historically, stocks (aggressive) have always recovered from downturns over 15+ year periods. Consider a stock-heavy portfolio if you won't need this money soon.`
      );
    } else if (years < 5) {
      insights.push(
        `With only ${years} years, a conservative or savings approach is safer. Stocks can drop 30-40% in a bad year. A high-yield savings account at 4.5% is risk-free.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, scenarios, totalContributed, initial, monthly, years]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-emerald-600" /> Investment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Initial Investment</Label>
              <Input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} min={0} step={1000} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Monthly Addition</Label>
              <Input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} min={0} step={100} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><Calendar className="h-4 w-4 text-gray-400" /> Years</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} min={1} max={50} />
            </div>
          </div>
          <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700" size="lg" onClick={() => setCalculated(true)}>
            Compare Scenarios
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Savings (4.5%)</p>
                <p className="text-xl font-bold">{formatMoney(scenarios.savings.finalBalance)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Conservative (5%)</p>
                <p className="text-xl font-bold">{formatMoney(scenarios.conservative.finalBalance)}</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Moderate (7%)</p>
                <p className="text-xl font-bold text-emerald-800">{formatMoney(scenarios.moderate.finalBalance)}</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Aggressive (10%)</p>
                <p className="text-xl font-bold text-blue-800">{formatMoney(scenarios.aggressive.finalBalance)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-lg">Scenario Comparison</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scenarios.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} interval={Math.max(0, Math.floor(years / 6))} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => formatMoney(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="High-Yield Savings (4.5%)" stroke="#94a3b8" dot={false} />
                    <Line type="monotone" dataKey="Conservative (5%)" stroke="#f59e0b" dot={false} />
                    <Line type="monotone" dataKey="Moderate (7%)" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Aggressive (10%)" stroke="#3b82f6" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Investment Analysis</Badge>
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
