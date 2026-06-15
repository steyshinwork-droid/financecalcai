"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, Sparkles, Info, Calendar } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

// Annual CPI inflation rates (approximate US averages by year)
const CPI_RATES: Record<number, number> = {
  1990: 5.4, 1991: 4.2, 1992: 3.0, 1993: 3.0, 1994: 2.6, 1995: 2.8,
  1996: 2.9, 1997: 2.3, 1998: 1.6, 1999: 2.2, 2000: 3.4, 2001: 2.8,
  2002: 1.6, 2003: 2.3, 2004: 2.7, 2005: 3.4, 2006: 3.2, 2007: 2.8,
  2008: 3.8, 2009: -0.4, 2010: 1.6, 2011: 3.2, 2012: 2.1, 2013: 1.5,
  2014: 1.6, 2015: 0.1, 2016: 1.3, 2017: 2.1, 2018: 2.4, 2019: 1.8,
  2020: 1.2, 2021: 4.7, 2022: 8.0, 2023: 4.1, 2024: 2.9, 2025: 2.5,
};

const MIN_YEAR = 1990;
const MAX_YEAR = 2025;

export function InflationCalc() {
  const [amountStr, setAmount, amount] = useNumInput(1000);
  const [fromYearStr, setFromYear, fromYear] = useNumInput(2000);
  const [toYearStr, setToYear, toYear] = useNumInput(2025);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const start = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(fromYear)));
    const end = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(toYear)));
    if (start >= end) return null;

    let value = amount;
    const chartData: { year: number; value: number }[] = [{ year: start, value: Math.round(value) }];

    for (let y = start + 1; y <= end; y++) {
      const rate = (CPI_RATES[y] ?? 2.5) / 100;
      value = value * (1 + rate);
      chartData.push({ year: y, value: Math.round(value) });
    }

    const adjustedAmount = value;
    const totalInflation = ((adjustedAmount - amount) / amount) * 100;
    const avgAnnual = (Math.pow(adjustedAmount / amount, 1 / (end - start)) - 1) * 100;
    const purchasingPowerLost = amount - amount * (amount / adjustedAmount);
    const todayEquivalent = adjustedAmount;

    return { adjustedAmount, totalInflation, avgAnnual, chartData, purchasingPowerLost, todayEquivalent };
  }, [amountStr, fromYearStr, toYearStr]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inflation Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
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
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> From Year
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={fromYearStr}
                onChange={(e) => setFromYear(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="1990–2024"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-400" /> To Year
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={toYearStr}
                onChange={(e) => setToYear(e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder="1991–2025"
              />
            </div>
          </div>
          <Button className="mt-6 w-full bg-orange-500 hover:bg-orange-600" size="lg" onClick={() => setCalculated(true)}>
            Calculate Inflation
          </Button>
        </CardContent>
      </Card>

      {calculated && results && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-orange-700">Value in {Math.round(toYear)}</p>
                <p className="text-2xl font-bold text-orange-800">{formatMoney(results.adjustedAmount)}</p>
                <p className="text-xs text-orange-600">= {formatMoney(amount)} in {Math.round(fromYear)}</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">Total Inflation</p>
                <p className="text-2xl font-bold text-red-800">+{results.totalInflation.toFixed(1)}%</p>
                <p className="text-xs text-red-600">Over {Math.round(toYear) - Math.round(fromYear)} years</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Avg Annual Rate</p>
                <p className="text-2xl font-bold text-gray-900">{results.avgAnnual.toFixed(1)}%/yr</p>
                <p className="text-xs text-gray-400">Compound average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">Purchasing Power Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} labelFormatter={(l) => `Year ${l}`} />
                  <Area type="monotone" dataKey="value" stroke="#f97316" fill="#fff7ed" strokeWidth={2} name="Equivalent Value" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Inflation Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="leading-relaxed text-gray-700">
                  {formatMoney(amount)} in {Math.round(fromYear)} has the same purchasing power as {formatMoney(results.adjustedAmount)} in {Math.round(toYear)} — a {results.totalInflation.toFixed(0)}% increase over {Math.round(toYear) - Math.round(fromYear)} years.
                </p>
                <p className="leading-relaxed text-gray-700">
                  Put differently: if your salary or savings didn&apos;t grow by at least {results.totalInflation.toFixed(0)}% since {Math.round(fromYear)}, your real purchasing power has declined. This is why investing to beat inflation matters — a savings account earning less than inflation loses real value every year.
                </p>
                <p className="leading-relaxed text-gray-700">
                  The S&amp;P 500 has historically returned ~10%/year before inflation, or ~7% after inflation — well above the {results.avgAnnual.toFixed(1)}%/year inflation rate in this period. That&apos;s why long-term investing is essential for preserving and growing wealth.
                </p>
              </div>
              <Separator className="my-4" />
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <Info className="h-3 w-3" /> Based on US CPI data. Historical rates are approximate.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="inflation"
              title={`$${amount} in ${Math.round(fromYear)} → $${Math.round(results.adjustedAmount).toLocaleString()} in ${Math.round(toYear)}`}
              inputs={{ amount, fromYear: Math.round(fromYear), toYear: Math.round(toYear) }}
              results={{ adjustedAmount: Math.round(results.adjustedAmount), totalInflation: parseFloat(results.totalInflation.toFixed(1)), avgAnnual: parseFloat(results.avgAnnual.toFixed(1)) }}
            />
          </div>
        </>
      )}

      {calculated && !results && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">Please enter valid years between {MIN_YEAR} and {MAX_YEAR}, with &quot;From&quot; earlier than &quot;To&quot;.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
