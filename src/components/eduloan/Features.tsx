import { Card } from "@/components/ui/card";
import { Brain, BarChart3, Sparkles, Building2, Calculator, FileScan } from "lucide-react";

const features = [
  { icon: Brain, title: "Loan Approval Prediction", desc: "ML-driven probability scoring trained on real applicant data.", tone: "from-blue-500 to-blue-600" },
  { icon: BarChart3, title: "Explainable AI (SHAP)", desc: "Transparent breakdown of every factor influencing your decision.", tone: "from-indigo-500 to-indigo-600" },
  { icon: Sparkles, title: "Gemini-Powered Insights", desc: "Conversational advisor reports tailored to your profile.", tone: "from-purple-500 to-purple-600" },
  { icon: Building2, title: "Lender Recommendation Engine", desc: "Best-fit Indian and international education lenders.", tone: "from-sky-500 to-blue-600" },
  { icon: Calculator, title: "EMI Planning Tool", desc: "Visualize EMI, total interest and repayment instantly.", tone: "from-violet-500 to-purple-600" },
  { icon: FileScan, title: "Document Intelligence", desc: "Auto-extract academic & financial fields. Coming soon.", tone: "from-fuchsia-500 to-pink-600", soon: true },
];

export function Features() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-medium text-blue-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Platform Capabilities
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Everything you need to fund your education
          </h2>
          <p className="mt-3 text-slate-600">
            A unified workspace blending predictive ML, explainability and generative AI.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="group relative overflow-hidden border-slate-200/80 p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${f.tone} p-3 text-white shadow-lg`}>
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                {f.soon && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">Soon</span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
