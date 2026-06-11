"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Calendar, Sparkles, Info, TrendingUp, Percent } from "lucide-react";
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

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function calcDividendGrowth(
  shares: number,
  pricePerShare: number,
  annualDividendPerShare: number,
  dividendGrowthRate: number,
  shareAppreciation: number,
  years: number,
  reinvest: boolean
) {
  const data = [];
  let currentShares = shares;
  let currentPrice = pricePerShare;
  let currentDPS = annualDividendPerShare;
  let totalDividendsReceived = 0;

  for (let y = 0; y <= years; y++) {
    const annualDividend = currentShares * currentDPS;
    const portfolioValue = currentShares * currentPrice;
    totalDividendsReceived += y === 0 ? 0 : annualDividend;

    data.push({
      year: y,
      portfolioValue: Math.round(portfolioValue),
      annualIncome: Math.round(annualDividend),
      totalDividends: Math.round(totalDividendsReceived),
      shares: Math.round(currentShares * 100) / 100,
    });

    if (y < years) {
      if (reinvest && currentPrice > 0) {
        const newShares = annualDividend / currentPrice;
        currentShares += newShares;
      }
      currentPrice *= 1 + shareAppreciation / 100;
      currentDPS *= 1 + dividendGrowthRate / 100;
    }
  }

  return data;
}

export function DividendCalc() {
  const [sharesStr, setShares, shares] = useNumInput(100);
  const [priceStr, setPrice, price] = useNumInput(50);
  const [dpsStr, setDps, dps] = useNumInput(2);
  const [growthStr, setGrowth, growth] = useNumInput(6);
  const [appreciationStr, setAppreciation, appreciation] = useNumInput(5);
  const [yearsStr, setYears, years] = useNumInput(20);
  const [reinvest, setReinvest] = useState(true);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const withDrip = calcDividendGrowth(shares, price, dps, growth, appreciation, years, true);
    const withoutDrip = calcDividendGrowth(shares, price, dps, growth, appreciation, years, false);

    const chartData = Array.from({ length: years + 1 }, (_, i) => ({
      year: `Year ${i}`,
      "With DRIP": withDrip[i].portfolioValue,
      "Without DRIP": withoutDrip[i].portfolioValue,
    }));

    const incomeChart = Array.from({ length: years + 1 }, (_, i) => ({
      year: `Year ${i}`,
      "Annual Income (DRIP)": withDrip[i].annualIncome,
      "Annual Income (No DRIP)": withoutDrip[i].annualIncome,
    }));

    return { withDrip, withoutDrip, chartData, incomeChart };
  }, [sharesStr, priceStr, dpsStr, growthStr, appreciationStr, yearsStr]);

  const final = results.withDrip[results.withDrip.length - 1];
  const finalNoDrip = results.withoutDrip[results.withoutDrip.length - 1];
  const initialValue = shares * price;
  const currentYield = price > 0 ? ((dps / price) * 100).toFixed(2) : "0.00";

  const aiInsight = useMemo(() => {
    if (!calculated) return "";
    const insights: string[] = [];

    const dripGain = final.portfolioValue - finalNoDrip.portfolioValue;
    insights.push(
      `Starting with ${shares} shares worth ${formatMoney(initialValue)} (${currentYield}% yield), reinvesting dividends grows your portfolio to ${formatMoney(final.portfolioValue)} after ${years} years. Without DRIP, the same portfolio reaches only ${formatMoney(finalNoDrip.portfolioValue)} — a ${formatMoney(dripGain)} difference from reinvestment alone.`
    );

    insights.push(
      `Your annual dividend income grows from ${formatMoney(results.withDrip[1]?.annualIncome ?? dps * shares)} to ${formatMoney(final.annualIncome)} per year — thanks to ${growth}% annual dividend growth and compounding shares from DRIP. That's ${formatMoney(final.annualIncome / 12)}/month in passive income by year ${years}.`
    );

    if (growth >= 5) {
      insights.push(
        `A ${growth}% annual dividend growth rate is strong. Dividend Aristocrats (S&P 500 companies with 25+ years of consecutive increases) average 6–8% annual dividend growth. At this rate, your income doubles roughly every ${Math.round(72 / growth)} years — the Rule of 72 applied to dividend growth.`
      );
    }

    return insights.join("\n\n");
  }, [calculated, results, final, finalNoDrip, initialValue, currentYield, shares, price, dps, growth, years, yearsStr]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-indigo-600" /> Portfolio Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><TrendingUp className="h-4 w-4 text-gray-400" /> Number of Shares</Label>
              <Input type="text" inputMode="numeric" value={sharesStr} onChange={(e) => setShares(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Price Per Share ($)</Label>
              <Input type="text" inputMode="decimal" value={priceStr} onChange={(e) => setPrice(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-gray-400" /> Annual Dividend Per Share ($)</Label>
              <Input type="text" inputMode="decimal" value={dpsStr} onChange={(e) => setDps(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><Percent className="h-4 w-4 text-gray-400" /> Dividend Growth Rate (%/yr)</Label>
              <Input type="text" inputMode="decimal" value={growthStr} onChange={(e) => setGrowth(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><Percent className="h-4 w-4 text-gray-400" /> Share Price Appreciation (%/yr)</Label>
              <Input type="text" inputMode="decimal" value={appreciationStr} onChange={(e) => setAppreciation(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><Calendar className="h-4 w-4 text-gray-400" /> Years</Label>
              <Input type="text" inputMode="numeric" value={yearsStr} onChange={(e) => setYears(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setReinvest(!reinvest)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${reinvest ? "bg-indigo-600" : "bg-gray-200"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${reinvest ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <Label className="cursor-pointer" onClick={() => setReinvest(!reinvest)}>
              Reinvest Dividends (DRIP)
            </Label>
          </div>

          <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700" size="lg" onClick={() => setCalculated(true)}>
            Calculate Dividend Growth
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-indigo-200 bg-indigo-50">
              <CardContent className="pt-6">
                <p className="text-sm text-indigo-700">Portfolio Value (Year {years})</p>
                <p className="text-xl font-bold text-indigo-900">{formatMoney(reinvest ? final.portfolioValue : finalNoDrip.portfolioValue)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Annual Income (Year {years})</p>
                <p className="text-xl font-bold">{formatMoney(reinvest ? final.annualIncome : finalNoDrip.annualIncome)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Monthly Income (Year {years})</p>
                <p className="text-xl font-bold">{formatMoney(Math.round((reinvest ? final.annualIncome : finalNoDrip.annualIncome) / 12))}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Current Dividend Yield</p>
                <p className="text-xl font-bold">{currentYield}%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-lg">Portfolio Value: DRIP vs. No DRIP</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} interval={Math.max(0, Math.floor(years / 6))} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => formatMoney(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="With DRIP" stroke="#6366f1" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Without DRIP" stroke="#94a3b8" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Annual Dividend Income Over Time</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.incomeChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} interval={Math.max(0, Math.floor(years / 6))} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => formatMoney(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="Annual Income (DRIP)" stroke="#6366f1" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Annual Income (No DRIP)" stroke="#94a3b8" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Dividend Analysis</Badge>
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
