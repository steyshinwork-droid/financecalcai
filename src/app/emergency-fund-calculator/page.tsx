import type { Metadata } from "next";
import { EmergencyFundCalc } from "./calculator";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator - Free AI-Powered | FinanceCalcAI",
  description:
    "Calculate how much you need in your emergency fund. AI analyzes your situation and creates a personalized savings plan.",
  keywords:
    "emergency fund calculator, how much emergency fund, emergency savings calculator, rainy day fund",
};

export default function EmergencyFundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Emergency Fund Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Find out how much you need for your emergency fund and how long it
          will take to build it. AI creates a personalized plan.
        </p>
      </div>
      <EmergencyFundCalc />
    </div>
  );
}
