import { Button } from "@/components/ui/button";
import { Sparkles, Calculator, GraduationCap, TrendingUp, ShieldCheck, BrainCircuit } from "lucide-react";

interface HeroProps {
  onAssessClick: () => void;
  onEmiClick: () => void;
}

export function Hero({ onAssessClick, onEmiClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-blue-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Explainable AI & Gemini
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduLoan Advisor AI
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Predict education loan approval using Explainable AI, Gemini-powered insights,
              lender recommendations, and financial planning tools.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                onClick={onAssessClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 transition-transform hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Assess Loan Eligibility
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onEmiClick}
                className="border-blue-200 bg-white/70 text-slate-800 backdrop-blur hover:bg-white"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate EMI
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 text-sm">
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-center backdrop-blur">
                <div className="text-xl font-bold text-blue-600">95%+</div>
                <div className="text-xs text-slate-500">Model Accuracy</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-center backdrop-blur">
                <div className="text-xl font-bold text-purple-600">50+</div>
                <div className="text-xs text-slate-500">Lenders Indexed</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-center backdrop-blur">
                <div className="text-xl font-bold text-indigo-600">SHAP</div>
                <div className="text-xs text-slate-500">Explainability</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 opacity-10 blur-2xl" />
              <div className="relative h-full rounded-3xl border border-white bg-white/80 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur">
                <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
                  <FloatTile icon={<GraduationCap className="h-8 w-8" />} label="Higher Education" tone="from-blue-500 to-blue-600" />
                  <FloatTile icon={<BrainCircuit className="h-8 w-8" />} label="AI Decisioning" tone="from-purple-500 to-purple-600" />
                  <FloatTile icon={<ShieldCheck className="h-8 w-8" />} label="Trusted Lenders" tone="from-indigo-500 to-indigo-600" />
                  <FloatTile icon={<TrendingUp className="h-8 w-8" />} label="Smart EMI" tone="from-sky-500 to-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatTile({ icon, label, tone }: { icon: React.ReactNode; label: string; tone: string }) {
  return (
    <div className={`flex flex-col items-start justify-between rounded-2xl bg-gradient-to-br ${tone} p-5 text-white shadow-lg transition-transform hover:-translate-y-1`}>
      {icon}
      <div className="mt-4 text-sm font-semibold">{label}</div>
    </div>
  );
}
