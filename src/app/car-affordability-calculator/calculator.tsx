"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Percent, Calendar, Sparkles, Info, Car } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function generateInsight(
  income: number,
  carPrice: number,
  downPayment: number,
  loanAmount: number,
  monthlyPayment: number,
  totalInterest: number,
  years: number,
  maxAffordable: number
): string {
  const parts: string[] = [];

  const paymentRatio = income > 0 ? (monthlyPayment / income) * 100 : 0;
  const carToIncome = carPrice / (income * 12);

  if (paymentRatio <= 10) {
    parts.push(`Your monthly payment is ${paymentRatio.toFixed(1)}% of gross income — well within the recommended 10–15% limit. You can comfortably afford this car.`);
  } else if (paymentRatio <= 15) {
    parts.push(`Your monthly payment is ${paymentRatio.toFixed(1)}% of gross income — at the upper edge of what most financial advisors recommend (10–15%). The car is affordable, but leaves little cushion for insurance and maintenance.`);
  } else {
    parts.push(`Warning: your payment is ${paymentRatio.toFixed(1)}% of gross income, above the recommended 15% ceiling. Combined with insurance ($100–250/month) and maintenance, total car costs could exceed 20–25% of income. Consider a lower price or larger down payment.`);
  }

  if (carToIncome > 0.5) {
    parts.push(`The 20% rule: the car costs ${(carToIncome * 100).toFixed(0)}% of your annual income. Financial experts typically recommend keeping total car value below 50% of annual income — you're ${carToIncome > 0.5 ? "above" : "within"} that threshold.`);
  }

  parts.push(
    `You'll pay ${formatMoney(totalInterest)} in total interest over ${years} year${years !== 1 ? "s" : ""}. ${downPayment > 0 ? `Your ${formatMoney(downPayment)} down payment reduces the loan and saves you interest.` : "Adding even a small down payment significantly reduces total interest paid."}`
  );

  if (maxAffordable < carPrice) {
    parts.push(`Based on your income, a car priced around ${formatMoney(maxAffordable)} would keep your payment at 15% of income — ${formatMoney(carPrice - maxAffordable)} less than your current selection.`);
  }

  parts.push(`Don't forget ongoing costs: insurance ($100–250/month), fuel ($80–200/month), and maintenance ($50–150/month). Total cost of ownership often runs 1.5–2× the sticker price over the loan term.`);

  return parts.join("\n\n");
}

export function CarAffordabilityCalc() {
  const [incomeStr, setIncome, income] = useNumInput(6000);
  const [carPriceStr, setCarPrice, carPrice] = useNumInput(28000);
  const [downPaymentStr, setDownPayment, downPayment] = useNumInput(5000);
  const [rateStr, setRate, rate] = useNumInput(7.5);
  const [yearsStr, setYears, years] = useNumInput(5);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const loanAmount = Math.max(0, carPrice - downPayment);
    const monthlyRate = rate / 100 / 12;
    const months = Math.round(years * 12);

    const monthlyPayment =
      loanAmount > 0 && monthlyRate > 0 && months > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
        : loanAmount / (months || 1);

    const totalPaid = monthlyPayment * months + downPayment;
    const totalInterest = monthlyPayment * months - loanAmount;

    // Max affordable car at 15% income rule
    const maxMonthly = income * 0.15;
    const maxLoan =
      monthlyRate > 0 && months > 0
        ? (maxMonthly * (Math.pow(1 + monthlyRate, months) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, months))
        : maxMonthly * months;
    const maxAffordable = maxLoan + downPayment;

    // Budget breakdown chart
    const insurance = 150;
    const fuel = 130;
    const maintenance = 80;
    const chartData = [
      { name: "Loan Payment", value: Math.round(monthlyPayment), color: "#3b82f6" },
      { name: "Insurance (est.)", value: insurance, color: "#f97316" },
      { name: "Fuel (est.)", value: fuel, color: "#eab308" },
      { name: "Maintenance (est.)", value: maintenance, color: "#6b7280" },
    ];

    const totalMonthly = monthlyPayment + insurance + fuel + maintenance;

    return { loanAmount, monthlyPayment, totalPaid, totalInterest, maxAffordable, chartData, totalMonthly };
  }, [incomeStr, carPriceStr, downPaymentStr, rateStr, yearsStr]);

  const aiInsight = useMemo(
    () =>
      calculated
        ? generateInsight(
            income,
            carPrice,
            downPayment,
            results.loanAmount,
            results.monthlyPayment,
            results.totalInterest,
            years,
            results.maxAffordable
          )
        : "",
    [calculated, incomeStr, carPriceStr, downPaymentStr, rateStr, yearsStr, results]
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-blue-600" /> Car & Financing Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Monthly Gross Income
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={incomeStr}
                onChange={(e) => setIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Car Price
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={carPriceStr}
                onChange={(e) => setCarPrice(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Down Payment
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                value={downPaymentStr}
                onChange={(e) => setDownPayment(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <p className="text-xs text-gray-400">
                {carPrice > 0 ? ((downPayment / carPrice) * 100).toFixed(0) : 0}% of car price
              </p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Interest Rate (%)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => setRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Loan Term (Years)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                value={yearsStr}
                onChange={(e) => setYears(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={() => setCalculated(true)}>
            Check Affordability
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Monthly Payment</p>
                <p className="text-2xl font-bold text-blue-800">{formatMoney(results.monthlyPayment)}</p>
                <p className="text-xs text-blue-600">loan only</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatMoney(results.loanAmount)}</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">Total Interest</p>
                <p className="text-2xl font-bold text-red-800">{formatMoney(results.totalInterest)}</p>
              </CardContent>
            </Card>
            <Card className={results.maxAffordable >= carPrice ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
              <CardContent className="pt-6">
                <p className={`text-sm ${results.maxAffordable >= carPrice ? "text-green-700" : "text-yellow-700"}`}>Max Affordable (15% rule)</p>
                <p className={`text-2xl font-bold ${results.maxAffordable >= carPrice ? "text-green-800" : "text-yellow-800"}`}>{formatMoney(results.maxAffordable)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">Estimated Monthly Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={results.chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} axisLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {results.chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-2 text-center text-sm text-gray-500">
                Total estimated monthly cost: <span className="font-semibold text-gray-800">{formatMoney(results.totalMonthly)}</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Affordability Analysis</Badge>
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
                <Info className="h-3 w-3" /> Insurance, fuel, and maintenance estimates are averages. Actual costs vary by location and vehicle.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
