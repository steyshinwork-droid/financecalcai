"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  DollarSign,
  Calendar,
  Percent,
  Sparkles,
  Info,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
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

function generateMortgageInsight(
  homePrice: number,
  downPayment: number,
  rate: number,
  years: number,
  monthlyPayment: number,
  totalInterest: number,
  income: number
): string {
  const insights: string[] = [];
  const downPaymentPercent = (downPayment / homePrice) * 100;
  const dtiRatio = income > 0 ? (monthlyPayment / income) * 100 : 0;

  // Affordability check
  if (income > 0) {
    if (dtiRatio <= 28) {
      insights.push(
        `Your mortgage payment is ${dtiRatio.toFixed(1)}% of your gross income — this is within the recommended 28% limit. You can comfortably afford this home.`
      );
    } else if (dtiRatio <= 36) {
      insights.push(
        `Your mortgage payment is ${dtiRatio.toFixed(1)}% of your gross income — above the ideal 28% but below the maximum 36%. It's doable, but you'll have less room for other expenses. Consider a less expensive home or a larger down payment.`
      );
    } else {
      insights.push(
        `Warning: Your mortgage payment is ${dtiRatio.toFixed(1)}% of your gross income — above the recommended 36% maximum. This could put you in financial stress. Consider a lower price, bigger down payment, or longer term.`
      );
    }
  }

  // Down payment advice
  if (downPaymentPercent < 20) {
    insights.push(
      `Your down payment is ${downPaymentPercent.toFixed(0)}% — below the typical 20%. This means you'll likely need Private Mortgage Insurance (PMI), adding $50-200/month to your costs. Saving for 20% down eliminates PMI and reduces your monthly payment.`
    );
  } else {
    insights.push(
      `Great — your ${downPaymentPercent.toFixed(0)}% down payment means no PMI required. This saves you $50-200/month compared to a smaller down payment.`
    );
  }

  // Interest rate context
  if (rate < 5) {
    insights.push(
      `At ${rate}%, you have a relatively low rate. Lock it in if you haven't already — rates can change quickly.`
    );
  } else if (rate >= 7) {
    insights.push(
      `At ${rate}%, rates are elevated. You'll pay ${formatMoney(totalInterest)} in total interest. Consider: refinancing when rates drop could save you thousands per year.`
    );
  }

  // 15 vs 30 year comparison
  if (years === 30) {
    const monthlyRate15 = rate / 100 / 12;
    const months15 = 15 * 12;
    const loanAmount = homePrice - downPayment;
    const payment15 =
      (loanAmount * (monthlyRate15 * Math.pow(1 + monthlyRate15, months15))) /
      (Math.pow(1 + monthlyRate15, months15) - 1);
    const totalInterest15 = payment15 * months15 - loanAmount;
    const savings = totalInterest - totalInterest15;
    insights.push(
      `Tip: A 15-year mortgage would cost ${formatMoney(payment15)}/month (${formatMoney(payment15 - monthlyPayment)} more) but save you ${formatMoney(savings)} in total interest.`
    );
  }

  return insights.join("\n\n");
}

export function MortgageCalc() {
  const [homePriceStr, setHomePrice, homePrice] = useNumInput(350000);
  const [downPaymentStr, setDownPayment, downPayment] = useNumInput(70000);
  const [rateStr, setRate, rate] = useNumInput(6.5);
  const [yearsStr, setYears, years] = useNumInput(30);
  const [incomeStr, setIncome, income] = useNumInput(7000);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
          (Math.pow(1 + monthlyRate, months) - 1)
        : loanAmount / months;

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;

    // Amortization breakdown by 5-year chunks
    const chartData = [];
    let remaining = loanAmount;
    const chunkYears = years <= 15 ? 3 : 5;

    for (let y = 0; y < years; y += chunkYears) {
      let principalChunk = 0;
      let interestChunk = 0;
      const endYear = Math.min(y + chunkYears, years);

      let tempRemaining = remaining;
      for (let m = 0; m < (endYear - y) * 12; m++) {
        const interestPayment = tempRemaining * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        interestChunk += interestPayment;
        principalChunk += principalPayment;
        tempRemaining -= principalPayment;
      }
      remaining = tempRemaining;

      chartData.push({
        period: `Year ${y + 1}-${endYear}`,
        principal: Math.round(principalChunk),
        interest: Math.round(interestChunk),
      });
    }

    return {
      loanAmount,
      monthlyPayment,
      totalPaid,
      totalInterest,
      chartData,
    };
  }, [homePriceStr, downPaymentStr, rateStr, yearsStr]);

  const aiInsight = useMemo(
    () =>
      calculated
        ? generateMortgageInsight(
            homePrice,
            downPayment,
            rate,
            years,
            results.monthlyPayment,
            results.totalInterest,
            income
          )
        : "",
    [calculated, homePriceStr, downPaymentStr, rateStr, yearsStr, results, incomeStr]
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="h-5 w-5 text-blue-600" />
            Enter Mortgage Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Home Price
              </Label>
              <Input
                id="price"
                type="text"
                inputMode="numeric"
                value={homePriceStr}
                onChange={(e) => setHomePrice(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="down" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Down Payment
              </Label>
              <Input
                id="down"
                type="text"
                inputMode="numeric"
                value={downPaymentStr}
                onChange={(e) => setDownPayment(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <p className="text-xs text-gray-400">
                {homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(0) : 0}% of home price
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate" className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" />
                Interest Rate (%)
              </Label>
              <Input
                id="rate"
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => setRate(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                Loan Term (Years)
              </Label>
              <Input
                id="term"
                type="text"
                inputMode="numeric"
                value={yearsStr}
                onChange={(e) => setYears(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="income" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Monthly Gross Income (for AI affordability check)
              </Label>
              <Input
                id="income"
                type="text"
                inputMode="numeric"
                value={incomeStr}
                onChange={(e) => setIncome(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <Button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={() => setCalculated(true)}
          >
            Calculate Mortgage
          </Button>
        </CardContent>
      </Card>

      {calculated && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Monthly Payment</p>
                <p className="text-2xl font-bold text-blue-800">
                  {formatMoney(results.monthlyPayment)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatMoney(results.loanAmount)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatMoney(results.totalPaid)}
                </p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">Total Interest</p>
                <p className="text-2xl font-bold text-red-800">
                  {formatMoney(results.totalInterest)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5 text-blue-600" />
                Principal vs Interest Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      formatter={(value) => formatMoney(Number(value))}
                    />
                    <Bar
                      dataKey="principal"
                      name="Principal"
                      stackId="a"
                      fill="#3b82f6"
                    />
                    <Bar
                      dataKey="interest"
                      name="Interest"
                      stackId="a"
                      fill="#fca5a5"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Insight
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  Affordability Analysis
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsight.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-gray-700">
                    {paragraph}
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
