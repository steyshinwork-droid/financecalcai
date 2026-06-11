"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Percent, Calendar, Sparkles, Info, Home } from "lucide-react";
import { SaveCalculationButton } from "@/components/save-calculation-button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

function useNumInput(initial: number) {
  const [str, setStr] = useState(String(initial));
  return [str, setStr, parseFloat(str) || 0] as const;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function generateInsight(
  monthlyRent: number,
  monthlyBuyCost: number,
  breakEvenYear: number | null,
  stayYears: number,
  netRentCost: number,
  netBuyCost: number,
  homeEquity: number,
  oppCost: number
): string {
  const parts: string[] = [];

  const rentCheaper = monthlyRent < monthlyBuyCost;
  const diff = Math.abs(monthlyBuyCost - monthlyRent);

  if (rentCheaper) {
    parts.push(`Renting costs ${fmt(diff)}/month less than buying upfront. That extra cash can be invested or used to pay down other debt — but buying builds equity over time.`);
  } else {
    parts.push(`Buying costs ${fmt(diff)}/month more than renting right now, but a significant portion goes toward equity you'll eventually own.`);
  }

  if (breakEvenYear !== null && breakEvenYear <= stayYears) {
    parts.push(`Break-even point: year ${breakEvenYear}. After that, buying becomes the cheaper option on a cumulative basis. Since you plan to stay ${stayYears} years, buying likely makes financial sense.`);
  } else if (breakEvenYear !== null && breakEvenYear > stayYears) {
    parts.push(`Break-even point is year ${breakEvenYear} — beyond your planned ${stayYears}-year stay. If you move before then, renting saves you money overall.`);
  } else {
    parts.push(`Based on your inputs, buying never reaches a break-even point over the time horizon modeled. Renting is the more cost-effective choice given your assumptions.`);
  }

  const winner = netBuyCost < netRentCost ? "buying" : "renting";
  const savings = fmt(Math.abs(netRentCost - netBuyCost));
  parts.push(`Over ${stayYears} years: total net cost to rent = ${fmt(netRentCost)}, total net cost to buy = ${fmt(netBuyCost)} (after recovering ${fmt(homeEquity)} in home equity). ${winner === "buying" ? `Buying saves approximately ${savings}.` : `Renting saves approximately ${savings}.`}`);

  if (oppCost > 0) {
    parts.push(`Opportunity cost of the down payment: ${fmt(oppCost)} — this is what your down payment could have grown to if invested instead. It's factored into the buying cost above.`);
  }

  parts.push(`Remember: this model uses fixed assumptions. Real results depend on actual home appreciation, rent changes, and how long you stay. The break-even point is the most important number — match it to your realistic timeline.`);

  return parts.join("\n\n");
}

export function RentVsBuyCalc() {
  const [rentStr, setRent, monthlyRent] = useNumInput(2200);
  const [rentIncreaseStr, setRentIncrease, rentIncrease] = useNumInput(3);
  const [homePriceStr, setHomePrice, homePrice] = useNumInput(400000);
  const [downPaymentStr, setDownPayment, downPayment] = useNumInput(80000);
  const [mortgageRateStr, setMortgageRate, mortgageRate] = useNumInput(6.8);
  const [loanTermStr, setLoanTerm, loanTerm] = useNumInput(30);
  const [propTaxStr, setPropTax, propTaxRate] = useNumInput(1.2);
  const [insuranceStr, setInsurance, insurance] = useNumInput(150);
  const [hoaStr, setHoa, hoa] = useNumInput(0);
  const [maintenanceStr, setMaintenance, maintenancePct] = useNumInput(1);
  const [appreciationStr, setAppreciation, appreciationRate] = useNumInput(3.5);
  const [investReturnStr, setInvestReturn, investReturn] = useNumInput(7);
  const [stayYearsStr, setStayYears, stayYears] = useNumInput(7);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPayment);
    const monthlyMortgageRate = mortgageRate / 100 / 12;
    const totalMonths = loanTerm * 12;

    const monthlyMortgage =
      loanAmount > 0 && monthlyMortgageRate > 0
        ? (loanAmount * (monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, totalMonths))) /
          (Math.pow(1 + monthlyMortgageRate, totalMonths) - 1)
        : loanAmount / totalMonths;

    const monthlyPropTax = (homePrice * (propTaxRate / 100)) / 12;
    const monthlyMaintenance = (homePrice * (maintenancePct / 100)) / 12;
    const monthlyBuyCost = monthlyMortgage + monthlyPropTax + insurance + hoa + monthlyMaintenance;

    // Year-by-year comparison
    const chartData: { year: number; rentCumulative: number; buyCumulative: number }[] = [];
    let rentCumulative = 0;
    let buyCumulative = downPayment; // upfront cost
    let currentRent = monthlyRent;
    let currentHomeValue = homePrice;
    let remainingLoan = loanAmount;
    let breakEvenYear: number | null = null;
    let oppCostTotal = downPayment;

    for (let year = 1; year <= Math.max(stayYears, 30); year++) {
      // Renting: 12 months of rent this year
      rentCumulative += currentRent * 12;
      currentRent *= 1 + rentIncrease / 100;

      // Buying: mortgage + ongoing costs this year
      const yearlyPropTax = currentHomeValue * (propTaxRate / 100);
      const yearlyMaintenance = currentHomeValue * (maintenancePct / 100);
      buyCumulative += monthlyMortgage * 12 + yearlyPropTax + insurance * 12 + hoa * 12 + yearlyMaintenance;
      currentHomeValue *= 1 + appreciationRate / 100;

      // Opportunity cost of down payment growing
      oppCostTotal *= 1 + investReturn / 100;

      // Remaining loan balance
      if (remainingLoan > 0) {
        for (let m = 0; m < 12; m++) {
          const interestPayment = remainingLoan * monthlyMortgageRate;
          const principalPayment = Math.min(monthlyMortgage - interestPayment, remainingLoan);
          remainingLoan = Math.max(0, remainingLoan - principalPayment);
        }
      }

      // Net buying cost = cumulative payments - equity at this point + opp cost
      const equity = currentHomeValue - remainingLoan;
      const netBuyCumulative = buyCumulative - equity + oppCostTotal - downPayment;

      chartData.push({
        year,
        rentCumulative: Math.round(rentCumulative),
        buyCumulative: Math.round(netBuyCumulative),
      });

      if (breakEvenYear === null && netBuyCumulative < rentCumulative) {
        breakEvenYear = year;
      }

      if (year >= Math.max(stayYears, 30)) break;
    }

    // Final numbers at stayYears
    const stayIdx = Math.min(stayYears - 1, chartData.length - 1);
    const netRentCost = chartData[stayIdx]?.rentCumulative ?? 0;
    const netBuyCost = chartData[stayIdx]?.buyCumulative ?? 0;

    // Recalculate equity at stayYears
    let finalHomeValue = homePrice;
    for (let y = 0; y < stayYears; y++) finalHomeValue *= 1 + appreciationRate / 100;
    let finalLoan = loanAmount;
    for (let m = 0; m < stayYears * 12; m++) {
      if (finalLoan <= 0) break;
      const interest = finalLoan * monthlyMortgageRate;
      const principal = Math.min(monthlyMortgage - interest, finalLoan);
      finalLoan = Math.max(0, finalLoan - principal);
    }
    const homeEquity = finalHomeValue - finalLoan;

    let finalOppCost = downPayment;
    for (let y = 0; y < stayYears; y++) finalOppCost *= 1 + investReturn / 100;
    const oppCostGrowth = finalOppCost - downPayment;

    return {
      monthlyMortgage,
      monthlyBuyCost,
      breakEvenYear,
      netRentCost,
      netBuyCost,
      homeEquity,
      oppCostGrowth,
      chartData: chartData.slice(0, Math.max(stayYears + 3, 15)),
    };
  }, [rentStr, rentIncreaseStr, homePriceStr, downPaymentStr, mortgageRateStr, loanTermStr, propTaxStr, insuranceStr, hoaStr, maintenanceStr, appreciationStr, investReturnStr, stayYearsStr]);

  const aiInsight = useMemo(
    () =>
      calculated
        ? generateInsight(
            monthlyRent,
            results.monthlyBuyCost,
            results.breakEvenYear,
            stayYears,
            results.netRentCost,
            results.netBuyCost,
            results.homeEquity,
            results.oppCostGrowth
          )
        : "",
    [calculated, results, monthlyRent, stayYears]
  );

  const buyWins = results.netBuyCost < results.netRentCost;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Renting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Home className="h-4 w-4 text-blue-500" /> Renting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" /> Monthly Rent
              </Label>
              <Input type="text" inputMode="numeric" value={rentStr} onChange={(e) => setRent(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Annual Rent Increase (%)
              </Label>
              <Input type="text" inputMode="decimal" value={rentIncreaseStr} onChange={(e) => setRentIncrease(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
          </CardContent>
        </Card>

        {/* Buying */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Home className="h-4 w-4 text-emerald-500" /> Buying
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-400" /> Home Price
                </Label>
                <Input type="text" inputMode="numeric" value={homePriceStr} onChange={(e) => setHomePrice(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-400" /> Down Payment
                </Label>
                <Input type="text" inputMode="numeric" value={downPaymentStr} onChange={(e) => setDownPayment(e.target.value)} onFocus={(e) => e.target.select()} />
                <p className="text-xs text-gray-400">{homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(0) : 0}% of price</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Percent className="h-4 w-4 text-gray-400" /> Mortgage Rate (%)
                </Label>
                <Input type="text" inputMode="decimal" value={mortgageRateStr} onChange={(e) => setMortgageRate(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" /> Loan Term (yrs)
                </Label>
                <Input type="text" inputMode="numeric" value={loanTermStr} onChange={(e) => setLoanTerm(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Percent className="h-4 w-4 text-gray-400" /> Property Tax (%)
                </Label>
                <Input type="text" inputMode="decimal" value={propTaxStr} onChange={(e) => setPropTax(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-400" /> Insurance/mo
                </Label>
                <Input type="text" inputMode="numeric" value={insuranceStr} onChange={(e) => setInsurance(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-400" /> HOA/mo
                </Label>
                <Input type="text" inputMode="numeric" value={hoaStr} onChange={(e) => setHoa(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Percent className="h-4 w-4 text-gray-400" /> Maintenance/yr (%)
                </Label>
                <Input type="text" inputMode="decimal" value={maintenanceStr} onChange={(e) => setMaintenance(e.target.value)} onFocus={(e) => e.target.select()} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-700">Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Home Appreciation/yr (%)
              </Label>
              <Input type="text" inputMode="decimal" value={appreciationStr} onChange={(e) => setAppreciation(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-gray-400" /> Investment Return/yr (%)
              </Label>
              <Input type="text" inputMode="decimal" value={investReturnStr} onChange={(e) => setInvestReturn(e.target.value)} onFocus={(e) => e.target.select()} />
              <p className="text-xs text-gray-400">opportunity cost of down payment</p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" /> Years You Plan to Stay
              </Label>
              <Input type="text" inputMode="numeric" value={stayYearsStr} onChange={(e) => setStayYears(e.target.value)} onFocus={(e) => e.target.select()} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg" onClick={() => setCalculated(true)}>
        Compare Rent vs. Buy
      </Button>

      {calculated && (
        <>
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">Monthly Rent</p>
                <p className="text-2xl font-bold text-blue-800">{fmt(monthlyRent)}</p>
                <p className="text-xs text-blue-600">current</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Monthly Buy Cost</p>
                <p className="text-2xl font-bold text-emerald-800">{fmt(results.monthlyBuyCost)}</p>
                <p className="text-xs text-emerald-600">mortgage + tax + ins + maint</p>
              </CardContent>
            </Card>
            <Card className={results.breakEvenYear !== null ? "border-amber-200 bg-amber-50" : "border-gray-200"}>
              <CardContent className="pt-6">
                <p className="text-sm text-amber-700">Break-Even Point</p>
                <p className="text-2xl font-bold text-amber-800">
                  {results.breakEvenYear !== null ? `Year ${results.breakEvenYear}` : "Never"}
                </p>
                <p className="text-xs text-amber-600">when buying beats renting</p>
              </CardContent>
            </Card>
            <Card className={buyWins ? "border-emerald-200 bg-emerald-50" : "border-blue-200 bg-blue-50"}>
              <CardContent className="pt-6">
                <p className={`text-sm ${buyWins ? "text-emerald-700" : "text-blue-700"}`}>Better Choice ({stayYears}yr)</p>
                <p className={`text-2xl font-bold ${buyWins ? "text-emerald-800" : "text-blue-800"}`}>
                  {buyWins ? "Buying" : "Renting"}
                </p>
                <p className={`text-xs ${buyWins ? "text-emerald-600" : "text-blue-600"}`}>
                  saves {fmt(Math.abs(results.netRentCost - results.netBuyCost))}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Net cost summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Net Cost to Rent ({stayYears} yrs)</p>
                <p className="text-xl font-bold text-gray-900">{fmt(results.netRentCost)}</p>
                <p className="text-xs text-gray-400">total rent paid</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Net Cost to Buy ({stayYears} yrs)</p>
                <p className="text-xl font-bold text-gray-900">{fmt(results.netBuyCost)}</p>
                <p className="text-xs text-gray-400">costs minus equity + opp cost</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-700">Home Equity at Year {stayYears}</p>
                <p className="text-xl font-bold text-emerald-800">{fmt(results.homeEquity)}</p>
                <p className="text-xs text-emerald-600">home value − remaining loan</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-800">Cumulative Net Cost Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} label={{ value: "Year", position: "insideBottom", offset: -2, fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={55} />
                  <Tooltip formatter={(value) => fmt(Number(value))} labelFormatter={(l) => `Year ${l}`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="rentCumulative" name="Rent (total paid)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="buyCumulative" name="Buy (net cost)" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-2 text-center text-xs text-gray-400">
                Buy net cost = all payments − home equity + opportunity cost of down payment
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <SaveCalculationButton
              calculatorType="rent-vs-buy"
              title={`$${homePriceStr} home vs $${rentStr}/mo rent, ${stayYearsStr}yr`}
              inputs={{ homePrice: homePriceStr, downPayment: downPaymentStr, mortgageRate: mortgageRateStr, monthlyRent: rentStr, stayYears: stayYearsStr }}
              results={{
                breakEvenYear: results.breakEvenYear ?? 0,
                monthlyBuyCost: Math.round(results.monthlyBuyCost),
                monthlyRentCost: Math.round(monthlyRent),
              }}
            />
          </div>

          {/* AI Insight */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600" /> AI Insight
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Rent vs. Buy Analysis</Badge>
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
                <Info className="h-3 w-3" /> Model assumes constant appreciation and investment returns. Actual results will vary.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
