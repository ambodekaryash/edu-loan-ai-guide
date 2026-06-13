import { GraduationCap, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-slate-900">EduLoan Advisor AI</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-600">
              Smarter education financing through Explainable AI, Gemini-powered insights and
              modern lender recommendations.
            </p>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Sparkles className="h-4 w-4 text-purple-600" /> Built using
            </div>
            <div className="flex flex-wrap gap-2">
              {["Machine Learning", "SHAP Explainability", "Gemini AI", "FastAPI", "React"].map((t) => (
                <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
          <div>© {new Date().getFullYear()} EduLoan Advisor AI. All rights reserved.</div>
          <div>Crafted for the next generation of learners.</div>
        </div>
      </div>
    </footer>
  );
}
