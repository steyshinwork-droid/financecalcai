import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "FinanceCalcAI";
  const description =
    searchParams.get("description") ||
    "Free AI-Powered Financial Calculators";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#065f46",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: "#ffffff",
                fontSize: 36,
                fontWeight: "bold",
                color: "#065f46",
              }}
            >
              FC
            </div>
            <span
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              FinanceCalcAI
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a7f3d0",
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            fontSize: 24,
            color: "#6ee7b7",
            opacity: 0.7,
          }}
        >
          financecalcai.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
