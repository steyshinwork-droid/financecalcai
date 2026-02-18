export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  relatedCalculator: { name: string; href: string };
  content: Section[];
}

interface Section {
  type: "intro" | "h2" | "h3" | "p" | "ul" | "ol" | "tip" | "cta";
  text?: string;
  items?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "snowball-vs-avalanche-debt-payoff",
    title: "Snowball vs Avalanche: The Best Way to Pay Off Debt Fast",
    description:
      "Two proven strategies to eliminate debt — which one saves you more money and gets you debt-free faster? We break down the math.",
    date: "2025-02-10",
    readTime: "6 min read",
    category: "Debt",
    relatedCalculator: {
      name: "Debt Payoff Calculator",
      href: "/debt-payoff-calculator",
    },
    content: [
      {
        type: "intro",
        text: "The average American carries over $21,000 in non-mortgage debt. If you're ready to get out of debt, you have two powerful strategies to choose from: the Debt Snowball and the Debt Avalanche. Both work. But they work differently — and one could save you thousands of dollars.",
      },
      {
        type: "h2",
        text: "What Is the Debt Snowball Method?",
      },
      {
        type: "p",
        text: "The Debt Snowball method, popularized by Dave Ramsey, focuses on psychology over math. You list all your debts from smallest balance to largest — ignoring the interest rate. You pay minimums on everything, then throw every extra dollar at the smallest debt.",
      },
      {
        type: "p",
        text: "Once the smallest debt is gone, you roll that payment into the next one. The 'snowball' grows as you eliminate each debt. The wins come fast, which keeps you motivated.",
      },
      {
        type: "ul",
        items: [
          "List debts from smallest to largest balance",
          "Pay minimums on all debts",
          "Put every extra dollar toward the smallest debt",
          "Once paid off, roll that payment to the next debt",
          "Repeat until debt-free",
        ],
      },
      {
        type: "h2",
        text: "What Is the Debt Avalanche Method?",
      },
      {
        type: "p",
        text: "The Debt Avalanche is mathematically optimal. You list debts from highest interest rate to lowest. Same idea — pay minimums on everything, attack the highest-rate debt first. You'll pay less interest overall and get debt-free faster (in terms of total time and money spent).",
      },
      {
        type: "ul",
        items: [
          "List debts from highest to lowest interest rate",
          "Pay minimums on all debts",
          "Put every extra dollar toward the highest-rate debt",
          "Once paid off, roll that payment to the next debt",
          "Repeat until debt-free",
        ],
      },
      {
        type: "h2",
        text: "Snowball vs Avalanche: A Real Example",
      },
      {
        type: "p",
        text: "Say you have three debts: a $500 medical bill (0% interest), a $3,000 credit card (22% APR), and a $8,000 car loan (7% APR). You have $300/month extra to put toward debt.",
      },
      {
        type: "p",
        text: "With the Snowball method: you tackle the $500 bill first, then the $3,000 card, then the car. You'll feel momentum quickly — that first win comes in under 2 months.",
      },
      {
        type: "p",
        text: "With the Avalanche method: you attack the 22% credit card first. You'll pay significantly less in total interest — potentially $400–$800 less depending on your balances.",
      },
      {
        type: "tip",
        text: "Pro Tip: If the highest-rate debt is also the smallest balance, Snowball and Avalanche give you the exact same result. Always check your specific numbers!",
      },
      {
        type: "h2",
        text: "Which Method Should You Choose?",
      },
      {
        type: "p",
        text: "Choose Snowball if you've tried paying off debt before and gave up. The quick wins are real and they matter. Studies show people using the Snowball method are more likely to actually finish paying off debt.",
      },
      {
        type: "p",
        text: "Choose Avalanche if you're disciplined, math-motivated, and your highest-rate debt is a large credit card balance. The savings can be substantial over a multi-year payoff.",
      },
      {
        type: "h2",
        text: "How to Speed Up Either Method",
      },
      {
        type: "ol",
        items: [
          "Increase your income — even $200/month extra cuts your payoff time dramatically",
          "Cut expenses — cancel unused subscriptions, reduce dining out",
          "Negotiate lower interest rates — call your credit card company and ask",
          "Consider a balance transfer to a 0% APR card (watch the fees)",
          "Use windfalls — tax refunds, bonuses go straight to debt",
        ],
      },
      {
        type: "cta",
        text: "Use our free Debt Payoff Calculator to compare both methods with your exact debts. See which saves you more and get a month-by-month payoff schedule.",
        ctaText: "Calculate Your Debt Payoff",
        ctaHref: "/debt-payoff-calculator",
      },
    ],
  },
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works: Turn $1,000 Into $10,000",
    description:
      "Einstein called it the eighth wonder of the world. Here's exactly how compound interest grows your money — and how to maximize it.",
    date: "2025-02-08",
    readTime: "5 min read",
    category: "Investing",
    relatedCalculator: {
      name: "Compound Interest Calculator",
      href: "/compound-interest-calculator",
    },
    content: [
      {
        type: "intro",
        text: "Compound interest is often called the eighth wonder of the world — and for good reason. It's the reason a 25-year-old who invests $5,000 today ends up with far more than a 35-year-old who invests $50,000. Time is the secret ingredient.",
      },
      {
        type: "h2",
        text: "Simple vs Compound Interest: The Key Difference",
      },
      {
        type: "p",
        text: "Simple interest earns returns only on your original principal. If you invest $1,000 at 10% simple interest, you earn $100 every year, forever.",
      },
      {
        type: "p",
        text: "Compound interest earns returns on your principal AND on your accumulated interest. That same $1,000 at 10% compound interest earns $100 in year one — but in year two, you earn 10% on $1,100, giving you $110. By year three, you earn on $1,210. It snowballs.",
      },
      {
        type: "h2",
        text: "The Compound Interest Formula",
      },
      {
        type: "p",
        text: "A = P × (1 + r/n)^(n×t) — where A is the final amount, P is the principal, r is the annual interest rate (as a decimal), n is how many times interest compounds per year, and t is time in years.",
      },
      {
        type: "p",
        text: "Example: $1,000 at 7% annual return, compounded monthly, for 30 years = $1,000 × (1 + 0.07/12)^(12×30) = $8,116. Your $1,000 became over $8,000 without adding a single dollar.",
      },
      {
        type: "h2",
        text: "How Compounding Frequency Affects Growth",
      },
      {
        type: "p",
        text: "The more frequently interest compounds, the more you earn. On $10,000 at 5% for 10 years:",
      },
      {
        type: "ul",
        items: [
          "Annual compounding: $16,288",
          "Monthly compounding: $16,470",
          "Daily compounding: $16,487",
        ],
      },
      {
        type: "p",
        text: "The difference between monthly and daily isn't huge — but annual vs monthly is meaningful over long periods. Most savings accounts and investments compound monthly or daily.",
      },
      {
        type: "h2",
        text: "The Rule of 72: Quick Mental Math",
      },
      {
        type: "p",
        text: "Want to know how long it takes to double your money? Divide 72 by your interest rate. At 6% annual return: 72 ÷ 6 = 12 years to double. At 9%: 72 ÷ 9 = 8 years.",
      },
      {
        type: "tip",
        text: "The Rule of 72 works for any rate. At 1% (typical savings account): it takes 72 years to double. At 10% (S&P 500 historical average): just 7.2 years. This is why investing beats saving.",
      },
      {
        type: "h2",
        text: "Why Starting Early Beats Investing More",
      },
      {
        type: "p",
        text: "Imagine two people: Anna invests $5,000/year from age 25 to 35 (10 years), then stops. Ben invests $5,000/year from age 35 to 65 (30 years). At 7% annual return, Anna has more money at 65 — despite investing for 20 fewer years and contributing $100,000 less.",
      },
      {
        type: "p",
        text: "Those first 10 years of compounding from age 25 to 35 are irreplaceable. Every year you delay costs you exponentially — not just linearly.",
      },
      {
        type: "h2",
        text: "How to Maximize Compound Interest",
      },
      {
        type: "ol",
        items: [
          "Start today — every year of delay is compounding you'll never get back",
          "Reinvest all dividends and interest automatically",
          "Maximize tax-advantaged accounts (401k, IRA) to compound tax-free",
          "Minimize fees — a 1% expense ratio costs you 20%+ of your final balance",
          "Add regular contributions — even $100/month dramatically accelerates growth",
        ],
      },
      {
        type: "cta",
        text: "See exactly how your money grows with our free Compound Interest Calculator. Enter your numbers and see a year-by-year breakdown with charts.",
        ctaText: "Calculate Your Growth",
        ctaHref: "/compound-interest-calculator",
      },
    ],
  },
  {
    slug: "how-much-house-can-i-afford",
    title: "How Much House Can I Afford? The Simple Formula",
    description:
      "The 28/36 rule, down payments, DTI ratios — everything you need to know before buying a home. Calculate your actual budget.",
    date: "2025-02-06",
    readTime: "7 min read",
    category: "Mortgage",
    relatedCalculator: {
      name: "Mortgage Calculator",
      href: "/mortgage-calculator",
    },
    content: [
      {
        type: "intro",
        text: "Buying a home is the biggest financial decision most people ever make. Yet most buyers don't know their actual budget until they sit down with a lender — often too late. Here's how to calculate exactly how much house you can afford before you ever step foot in an open house.",
      },
      {
        type: "h2",
        text: "The 28/36 Rule: The Foundation",
      },
      {
        type: "p",
        text: "Lenders use the 28/36 rule as a guideline. It says your monthly housing costs should not exceed 28% of your gross monthly income, and your total debt payments (housing + all loans) should not exceed 36%.",
      },
      {
        type: "p",
        text: "Example: If you earn $6,000/month gross, your max housing payment is $6,000 × 0.28 = $1,680. Your total debt (housing + car + student loans) should stay under $6,000 × 0.36 = $2,160.",
      },
      {
        type: "h2",
        text: "What's Included in Your Housing Payment?",
      },
      {
        type: "p",
        text: "Your monthly mortgage payment isn't just principal and interest. Lenders calculate PITI:",
      },
      {
        type: "ul",
        items: [
          "Principal — the amount you borrowed, being paid down",
          "Interest — the cost of borrowing (the bulk of early payments)",
          "Taxes — property taxes, usually 1-2% of home value annually",
          "Insurance — homeowner's insurance, typically $100-200/month",
          "PMI — if your down payment is under 20%, add 0.5-1% of loan annually",
          "HOA fees — if applicable, can be $100-500+/month",
        ],
      },
      {
        type: "h2",
        text: "How Your Down Payment Changes Everything",
      },
      {
        type: "p",
        text: "On a $400,000 home with a 7% interest rate (30-year loan):",
      },
      {
        type: "ul",
        items: [
          "3.5% down ($14,000): Payment ~$2,800/mo, including PMI",
          "10% down ($40,000): Payment ~$2,580/mo, including PMI",
          "20% down ($80,000): Payment ~$2,395/mo, no PMI",
        ],
      },
      {
        type: "p",
        text: "That 20% down payment eliminates PMI and saves $200-400/month — $72,000+ over the life of the loan. But saving for 20% can take years. The right down payment depends on your situation.",
      },
      {
        type: "h2",
        text: "Your Debt-to-Income Ratio (DTI): What Lenders Actually Check",
      },
      {
        type: "p",
        text: "DTI = Total monthly debt payments ÷ Gross monthly income. Most conventional loans require DTI under 43-45%. FHA loans allow up to 50% in some cases.",
      },
      {
        type: "tip",
        text: "Lower your DTI before applying: pay off credit card balances, avoid new car loans, and don't open new credit accounts 6-12 months before buying. Each point of DTI improvement can qualify you for more house.",
      },
      {
        type: "h2",
        text: "Hidden Costs First-Time Buyers Miss",
      },
      {
        type: "ol",
        items: [
          "Closing costs: 2-5% of loan amount ($8,000-$20,000 on a $400K home)",
          "Moving costs: $1,000-$5,000 depending on distance",
          "Immediate repairs and upgrades: budget $5,000-$15,000",
          "Ongoing maintenance: 1-2% of home value per year",
          "Utility increases: bigger house = bigger bills",
        ],
      },
      {
        type: "h2",
        text: "The Comfortable vs Maximum Budget",
      },
      {
        type: "p",
        text: "Just because a lender approves you for $500,000 doesn't mean you should spend $500,000. That's the maximum they'll lend — not what's comfortable for your life. Build in margin for job loss, medical emergencies, or a growing family.",
      },
      {
        type: "p",
        text: "Many financial advisors recommend targeting 2.5-3x your annual household income. If you earn $100,000/year, aim for $250,000-$300,000 in home price, not the $450,000 a bank might approve you for.",
      },
      {
        type: "cta",
        text: "Use our Mortgage Calculator to see your exact monthly payment at any home price, interest rate, and down payment. Get an AI analysis of whether the numbers make sense for your situation.",
        ctaText: "Calculate Your Mortgage",
        ctaHref: "/mortgage-calculator",
      },
    ],
  },
  {
    slug: "50-30-20-budget-rule",
    title: "The 50/30/20 Budget Rule: The Only Budget You'll Ever Need",
    description:
      "The simplest budgeting framework that actually works. Here's how to divide your income and why this rule has stood the test of time.",
    date: "2025-02-04",
    readTime: "5 min read",
    category: "Budgeting",
    relatedCalculator: {
      name: "Budget Calculator",
      href: "/budget-calculator",
    },
    content: [
      {
        type: "intro",
        text: "Most budgets fail because they're too complicated. Tracking 40 categories, entering every coffee purchase — it works for a week, then life happens. The 50/30/20 rule is different: three categories, five minutes to set up, and it covers everything.",
      },
      {
        type: "h2",
        text: "What Is the 50/30/20 Rule?",
      },
      {
        type: "p",
        text: "Popularized by Senator Elizabeth Warren in her book 'All Your Worth,' the 50/30/20 rule divides your after-tax income into three buckets:",
      },
      {
        type: "ul",
        items: [
          "50% Needs — housing, food, utilities, transportation, minimum debt payments",
          "30% Wants — dining out, entertainment, subscriptions, vacations, hobbies",
          "20% Savings & Debt — emergency fund, retirement, extra debt payments, investing",
        ],
      },
      {
        type: "h2",
        text: "The 50%: Your Needs",
      },
      {
        type: "p",
        text: "Needs are expenses you can't avoid — the non-negotiables. Housing (rent or mortgage), utilities, groceries, health insurance, minimum loan payments, and transportation to work.",
      },
      {
        type: "p",
        text: "If your needs exceed 50% of take-home pay, that's a warning sign. Either your income is too low for your lifestyle, or your fixed costs (rent, car payment) are too high. Something needs to change — usually it's finding a cheaper home, a more fuel-efficient car, or increasing income.",
      },
      {
        type: "tip",
        text: "Needs vs Wants can be tricky. Internet is a need. Netflix is a want. A basic phone plan is a need. The latest iPhone is a want. When in doubt, ask: 'Could I survive without this for 3 months?' If yes, it's a want.",
      },
      {
        type: "h2",
        text: "The 30%: Your Wants",
      },
      {
        type: "p",
        text: "This is the fun category — and the most flexible. Dining out, concerts, new clothes, streaming services, gym memberships, hobbies, travel. These improve your quality of life but aren't strictly necessary.",
      },
      {
        type: "p",
        text: "The 30% limit isn't about feeling guilty for spending on things you enjoy. It's about having a ceiling so wants don't crowd out savings. Most people who struggle financially aren't overspending on necessities — they're overspending on wants.",
      },
      {
        type: "h2",
        text: "The 20%: Savings and Debt",
      },
      {
        type: "p",
        text: "This is where your financial future is built. The 20% covers emergency fund contributions, retirement accounts (401k, IRA), investing, and extra debt payments beyond minimums.",
      },
      {
        type: "p",
        text: "Priority order: First, build a $1,000 starter emergency fund. Second, get your full 401k employer match (it's free money). Third, pay off high-interest debt. Fourth, fully fund your emergency fund (3-6 months expenses). Fifth, invest for retirement and other goals.",
      },
      {
        type: "h2",
        text: "Real Example: $4,000 Take-Home Pay",
      },
      {
        type: "ul",
        items: [
          "Needs (50%) = $2,000: Rent $1,200, Car $300, Groceries $300, Utilities $200",
          "Wants (30%) = $1,200: Dining $400, Entertainment $300, Clothes $200, Gym $100, Subscriptions $200",
          "Savings (20%) = $800: Emergency fund $300, 401k $300, Extra debt payment $200",
        ],
      },
      {
        type: "h2",
        text: "Adjusting the Rule for Your Situation",
      },
      {
        type: "p",
        text: "The 50/30/20 rule is a starting point, not a law. If you have high debt, try 50/20/30 — temporarily cutting wants to accelerate debt payoff. If you're aggressively saving for a house, try 50/15/35. If you live in an expensive city, 60/20/20 might be realistic.",
      },
      {
        type: "cta",
        text: "Try our Budget Calculator to instantly see how your income maps to the 50/30/20 rule. Get personalized AI tips on where you can save more.",
        ctaText: "Build Your Budget",
        ctaHref: "/budget-calculator",
      },
    ],
  },
  {
    slug: "how-much-emergency-fund",
    title: "How Much Should You Have in Your Emergency Fund?",
    description:
      "3 months or 6 months? The right emergency fund size depends on your specific situation. Here's the formula.",
    date: "2025-02-02",
    readTime: "5 min read",
    category: "Savings",
    relatedCalculator: {
      name: "Emergency Fund Calculator",
      href: "/emergency-fund-calculator",
    },
    content: [
      {
        type: "intro",
        text: "A single unexpected expense — a medical bill, car repair, job loss — is enough to derail years of financial progress. An emergency fund is the foundation of financial stability. But how much do you actually need? The answer is more personal than most people think.",
      },
      {
        type: "h2",
        text: "The Standard Rule: 3-6 Months of Expenses",
      },
      {
        type: "p",
        text: "Most financial experts recommend keeping 3-6 months of essential living expenses in a liquid, accessible account. 'Expenses' here means your monthly needs: rent, groceries, utilities, transportation, insurance, and minimum debt payments — not your full spending.",
      },
      {
        type: "p",
        text: "If your monthly essential expenses are $3,000, your target emergency fund is $9,000-$18,000. That range exists because different people need different amounts.",
      },
      {
        type: "h2",
        text: "Who Needs 3 Months vs 6 Months?",
      },
      {
        type: "p",
        text: "Closer to 3 months if you have:",
      },
      {
        type: "ul",
        items: [
          "Stable employment (government job, tenured position, high-demand field)",
          "Dual income household — if one person loses their job, the other covers basics",
          "Low debt and strong credit (could use credit as emergency backup)",
          "Skills that would make it easy to find a new job quickly",
        ],
      },
      {
        type: "p",
        text: "Closer to 6 months (or more) if you have:",
      },
      {
        type: "ul",
        items: [
          "Variable income — freelancer, contractor, commission-based sales",
          "Single income household",
          "Specialized career where job searches take months",
          "Dependents (children, elderly parents)",
          "Health conditions that could lead to medical expenses",
          "Industry that's prone to layoffs",
        ],
      },
      {
        type: "tip",
        text: "Self-employed or freelance? Consider 9-12 months of expenses. Your income can disappear faster than a salaried employee's, and it often takes longer to rebuild.",
      },
      {
        type: "h2",
        text: "Where to Keep Your Emergency Fund",
      },
      {
        type: "p",
        text: "Your emergency fund needs to be liquid (accessible within 1-2 days) and safe (FDIC-insured). But it should also earn something while it sits there. Best options:",
      },
      {
        type: "ol",
        items: [
          "High-yield savings account (HYSA): 4-5% APY, accessible in 1-2 days, FDIC insured",
          "Money market account: Similar rates, check-writing ability",
          "Short-term CDs (3-month): Slightly higher rates but locked for the term",
        ],
      },
      {
        type: "p",
        text: "Never keep your emergency fund in stocks, crypto, or any investment that can drop in value. Emergencies often happen during market downturns — you don't want to sell investments at a loss precisely when you need cash.",
      },
      {
        type: "h2",
        text: "Building Your Emergency Fund: A Step-by-Step Plan",
      },
      {
        type: "ol",
        items: [
          "Calculate your monthly essential expenses (use our calculator below)",
          "Multiply by your target months (3-6 based on your situation)",
          "Open a dedicated high-yield savings account — separate from your regular account",
          "Set up automatic transfers right after payday",
          "Start with $1,000 as a mini emergency fund while paying off debt",
          "Once debt-free (except mortgage), build the full fund",
        ],
      },
      {
        type: "h2",
        text: "What Counts as an Emergency?",
      },
      {
        type: "p",
        text: "This matters more than most people think. An emergency fund is for true emergencies: job loss, medical crisis, major car repair, urgent home repair. It is NOT for vacations, holiday gifts, or a sale on a new TV.",
      },
      {
        type: "p",
        text: "For predictable 'surprise' expenses — car maintenance, annual insurance payments, holiday spending — build separate sinking funds. This keeps your emergency fund intact for actual emergencies.",
      },
      {
        type: "cta",
        text: "Use our Emergency Fund Calculator to find your exact target amount based on your specific expenses and situation. Get a personalized savings plan.",
        ctaText: "Calculate Your Emergency Fund",
        ctaHref: "/emergency-fund-calculator",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
