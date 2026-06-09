import type { Metadata } from "next";
import { CarAffordabilityCalc } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { RelatedArticles } from "@/components/related-articles";
import { Breadcrumb } from "@/components/breadcrumb";
import { AffiliateBanner } from "@/components/affiliate-banner";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Car Affordability Calculator - How Much Car Can You Afford? | FinanceCalcAI",
  description:
    "Find out how much car you can afford based on your income. See monthly payment, total interest, and full cost of ownership including insurance and fuel. Free AI-powered car affordability calculator.",
  keywords:
    "car affordability calculator, how much car can I afford, car payment calculator, auto loan calculator, car buying calculator, vehicle affordability",
  alternates: { canonical: "/car-affordability-calculator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Car Affordability Calculator",
  url: "https://www.financecalcai.com/car-affordability-calculator",
  description: "Free car affordability calculator — see monthly payment, total cost, and get AI advice on how much car you can really afford.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CarAffordabilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Car Affordability Calculator" }]} />
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">Car Affordability Calculator</h1>
        <p className="text-lg text-gray-600">
          Enter your income, car price, and financing details to see if you can truly afford the car — including loan payment, insurance, and fuel.
        </p>
      </div>

      <CarAffordabilityCalc />

      <div className="mt-10">
        <AffiliateBanner variant="general" />
      </div>

      <section className="mt-16 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">How Much Car Can You Afford?</h2>
          <p className="text-gray-600">
            The most widely cited rule is the 15% guideline: your total monthly car payment should not exceed
            15% of your gross monthly income. On a $5,000/month income, that's $750/month. Some advisors use
            the stricter 10% rule, especially if you have other significant debts. A separate heuristic —
            the 20/4/10 rule — suggests putting 20% down, financing for no more than 4 years, and keeping
            total car costs under 10% of gross income.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">True Cost of Car Ownership</h2>
          <p className="text-gray-600">
            The sticker price is only part of the story. On average, US car owners pay $150/month for
            insurance, $130/month for fuel, and $80/month for maintenance and repairs. For a newer vehicle
            add depreciation — new cars lose 15–25% of value in the first year. When you add all these up,
            a $28,000 car with a $530/month loan payment can easily cost $1,000+/month to own. Our calculator
            shows you this total picture so there are no surprises.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">New vs Used: Which Is Smarter?</h2>
          <p className="text-gray-600">
            New cars offer lower interest rates (often 4–6% vs 8–12% for used), warranty coverage, and
            the latest safety features. Used cars cost significantly less upfront and depreciate slower —
            a 2–3 year old car with 30,000 miles often sells for 30–40% less than new. For budget-conscious
            buyers, a certified pre-owned (CPO) vehicle combines used-car pricing with a manufacturer
            warranty — often the best value proposition.
          </p>
        </div>
      </section>

      <FaqSection items={[
        { question: "What is the 20/4/10 rule for buying a car?", answer: "Put 20% down, finance for no more than 4 years, and keep total vehicle costs (payment + insurance + fuel) under 10% of gross monthly income. On $6,000/month income, total car costs should stay under $600/month. This keeps you from being car-poor and protects you from being underwater on the loan." },
        { question: "How much car can I afford on my salary?", answer: "A common guideline is to spend no more than 15% of monthly gross income on car payment alone, or 20% including insurance. On $5,000/month gross: payment should stay under $750, total car costs under $1,000. But these are ceilings, not targets — spending less leaves more room for savings and other goals." },
        { question: "Is it better to lease or buy a car?", answer: "Buying is almost always better long-term. Leasing gives you lower monthly payments but you build zero equity and face mileage limits (typically 10,000–15,000 miles/year). Buying makes more sense if you drive over 15,000 miles/year, plan to keep the car 5+ years, or want to avoid perpetual car payments. Leasing can make sense for business owners who write it off." },
        { question: "What credit score do I need for a good auto loan rate?", answer: "720+ gets the best rates (under 6%). 660–719 typically gets 7–9%. 620–659: 10–14%. Below 620, expect 15–20%+. The difference between 5% and 15% on a $30,000 loan over 5 years is about $8,000 in extra interest. Improving your score before buying can save you thousands." },
        { question: "Should I put more money down on a car?", answer: "Yes, when possible. A larger down payment reduces your loan amount, monthly payment, total interest, and risk of going 'underwater.' New cars lose 15–25% of value in year one — without a significant down payment, you may owe more than the car is worth if you need to sell early. Aim for 20% down on new cars, 10%+ on used." },
      ]} />
      <RelatedArticles calculatorHref="/car-affordability-calculator" />
      <RelatedCalculators currentSlug="car-affordability-calculator" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the 20/4/10 rule for buying a car?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 20/4/10 rule says: put 20% down, finance for no more than 4 years, and keep total vehicle expenses (payment + insurance) under 10% of gross monthly income. For a $6,000/month income, total car costs should stay below $600/month.",
                },
              },
              {
                "@type": "Question",
                name: "What credit score do I need for a good auto loan rate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For the best auto loan rates (under 6%), you typically need a credit score of 720 or higher. Scores 660–719 get rates around 7–9%. Scores 620–659 often see 10–14%. Below 620, rates can exceed 15–20%. A larger down payment can sometimes offset a lower score.",
                },
              },
              {
                "@type": "Question",
                name: "Is it better to put more money down on a car?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — a larger down payment reduces your loan amount, monthly payment, and total interest paid. It also prevents being 'underwater' (owing more than the car is worth), which is a major risk in the first 1–2 years. Aim for at least 10–20% down, or more if you can afford it.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
