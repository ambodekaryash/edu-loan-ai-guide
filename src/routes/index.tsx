import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/eduloan/Hero";
import { Navbar } from "@/components/eduloan/Navbar";
import { LoanForm } from "@/components/eduloan/LoanForm";
import { PredictionDashboard } from "@/components/eduloan/PredictionDashboard";
import { EmiCalculator } from "@/components/eduloan/EmiCalculator";
import { Features } from "@/components/eduloan/Features";
import { Footer } from "@/components/eduloan/Footer";
import { predictLoan, type PredictRequest, type PredictResponse } from "@/lib/api";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduLoan Advisor AI — Predict, Explain & Plan Your Education Loan" },
      {
        name: "description",
        content:
          "AI-powered education loan eligibility prediction with Explainable AI (SHAP), Gemini insights, lender recommendations and EMI planning.",
      },
      { property: "og:title", content: "EduLoan Advisor AI" },
      {
        property: "og:description",
        content:
          "Predict education loan approval using Explainable AI, Gemini-powered insights, lender recommendations and financial planning tools.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const assessRef = useRef<HTMLDivElement>(null);
  const emiRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handlePredict = async (payload: PredictRequest) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await predictLoan(payload);
      setResult(data);
      toast.success("Prediction ready", { description: `Result: ${data.prediction}` });
      setTimeout(() => scrollTo(resultRef), 200);
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ??
        "Could not reach the prediction service. Please try again.";
      setError(message);
      toast.error("Prediction failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900">
      <Toaster position="top-right" richColors />
      <Navbar onAssessClick={() => scrollTo(assessRef)} />

      <Hero
        onAssessClick={() => scrollTo(assessRef)}
        onEmiClick={() => scrollTo(emiRef)}
      />

      <section id="assess" ref={assessRef} className="bg-gradient-to-b from-white to-blue-50/20 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <LoanForm onSubmit={(p) => handlePredict(p)} loading={loading} />
        </div>
      </section>

      <section ref={resultRef} className="px-6 pb-4">
        <div className="mx-auto max-w-6xl">
          {loading && <LoadingSkeleton />}
          {error && !loading && (
            <Card className="border-rose-200 bg-rose-50/40">
              <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                <AlertCircle className="h-10 w-10 text-rose-500" />
                <div className="text-lg font-semibold text-rose-700">Something went wrong</div>
                <p className="max-w-md text-sm text-rose-600">{error}</p>
                <Button variant="outline" onClick={() => setError(null)}>Dismiss</Button>
              </CardContent>
            </Card>
          )}
          {result && !loading && <PredictionDashboard result={result} />}
        </div>
      </section>

      <section id="emi" ref={emiRef} className="bg-gradient-to-b from-white to-purple-50/20 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <EmiCalculator />
        </div>
      </section>

      <div id="features">
        <Features />
      </div>

      <Footer />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="border-slate-200">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <div className="text-lg font-semibold text-slate-800">Analyzing your application…</div>
        <p className="max-w-md text-sm text-slate-500">
          Running ML inference, generating SHAP explanations and consulting Gemini for advisory insights.
        </p>
        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 md:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />)}
        </div>
      </CardContent>
    </Card>
  );
}
