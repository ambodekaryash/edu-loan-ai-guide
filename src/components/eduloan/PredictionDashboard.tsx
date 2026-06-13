import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";
import {
  CheckCircle2, XCircle, TrendingUp, TrendingDown, Sparkles, Building2, Plane, ShieldCheck,
} from "lucide-react";
import type { Factor, Lender, PredictResponse } from "@/lib/api";

interface Props {
  result: PredictResponse;
}

export function PredictionDashboard({ result }: Props) {
  const approved = result.prediction.toLowerCase() === "approved";
  const prob = Math.max(0, Math.min(100, result.approval_probability));

  return (
    <div className="space-y-10">
      <ApprovalCard approved={approved} probability={prob} />
      <ExplainableAI positives={result.top_positive_factors} negatives={result.top_negative_factors} />
      <GeminiInsights text={result.llm_explanation} />
      <RecommendedLenders lenders={result.recommended_lenders} />
    </div>
  );
}

function ApprovalCard({ approved, probability }: { approved: boolean; probability: number }) {
  const tone = approved ? "emerald" : "rose";
  const radius = 80;
  const stroke = 12;
  const c = 2 * Math.PI * radius;
  const offset = c - (probability / 100) * c;
  const ringColor = approved ? "#10b981" : "#ef4444";

  return (
    <Card className="overflow-hidden border-slate-200/80 shadow-xl shadow-blue-500/5">
      <div className={`h-1.5 w-full bg-gradient-to-r ${approved ? "from-emerald-400 to-teal-500" : "from-rose-400 to-red-500"}`} />
      <CardContent className="p-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r={radius} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
                <circle
                  cx="100" cy="100" r={radius} stroke={ringColor} strokeWidth={stroke} fill="none"
                  strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-4xl font-bold ${approved ? "text-emerald-600" : "text-rose-600"}`}>
                  {probability.toFixed(1)}%
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500">Approval</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Badge className={`${approved ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-rose-100 text-rose-700 hover:bg-rose-100"} border-0`}>
              AI Prediction Complete
            </Badge>
            <div className="flex items-center gap-3">
              {approved ? (
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              ) : (
                <XCircle className="h-10 w-10 text-rose-500" />
              )}
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  Loan {approved ? "Approved" : "Rejected"}
                </div>
                <div className="text-sm text-slate-500">
                  Based on your provided financial and credit profile
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {approved
                ? `Our model estimates a strong ${probability.toFixed(1)}% probability of approval. Review the factors and lender recommendations below to optimize your application.`
                : `Approval probability is ${probability.toFixed(1)}%. Review the negative factors below — addressing them can significantly improve your chances.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExplainableAI({ positives, negatives }: { positives: Factor[]; negatives: Factor[] }) {
  const chartData = [
    ...positives.map((f) => ({ ...f, type: "positive" })),
    ...negatives.map((f) => ({ ...f, type: "negative" })),
  ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  return (
    <Card className="border-slate-200/80 shadow-xl shadow-blue-500/5">
      <CardHeader>
        <CardTitle className="text-2xl">Why Was This Decision Made?</CardTitle>
        <p className="text-sm text-slate-500">
          Explainable AI (SHAP) breakdown of the factors that most influenced your prediction.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FactorList title="Top Positive Factors" icon={<TrendingUp className="h-4 w-4" />} factors={positives} positive />
          <FactorList title="Top Negative Factors" icon={<TrendingDown className="h-4 w-4" />} factors={negatives} positive={false} />
        </div>

        {chartData.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-700">SHAP Feature Impact</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis type="category" dataKey="feature" stroke="#64748b" fontSize={12} width={140} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(value: number) => value.toFixed(3)}
                />
                <Bar dataKey="impact" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.impact >= 0 ? "#10b981" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FactorList({ title, icon, factors, positive }: { title: string; icon: React.ReactNode; factors: Factor[]; positive: boolean }) {
  const tone = positive
    ? "border-emerald-200 bg-emerald-50/50"
    : "border-rose-200 bg-rose-50/50";
  const badgeTone = positive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700";
  return (
    <div>
      <div className={`mb-3 flex items-center gap-2 text-sm font-semibold ${positive ? "text-emerald-700" : "text-rose-700"}`}>
        {icon}
        {title}
      </div>
      <div className="space-y-2">
        {factors.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
            No factors reported
          </div>
        ) : factors.map((f, i) => (
          <div key={i} className={`flex items-center justify-between rounded-xl border p-4 ${tone}`}>
            <div className="font-medium text-slate-800">{f.feature.replace(/_/g, " ")}</div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeTone}`}>
              Impact: {f.impact >= 0 ? "+" : ""}{f.impact.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeminiInsights({ text }: { text: string }) {
  return (
    <Card className="overflow-hidden border-0 shadow-xl shadow-purple-500/10">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-1">
        <div className="rounded-[calc(var(--radius)-2px)] bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI Loan Advisor Report</CardTitle>
                <p className="text-sm text-slate-500">Personalized analysis generated by Gemini</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
              {text ? (
                <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed text-slate-700">
                  {text}
                </div>
              ) : (
                <div className="text-sm italic text-slate-400">No AI commentary available for this prediction.</div>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

function RecommendedLenders({ lenders }: { lenders: Lender[] }) {
  return (
    <Card className="border-slate-200/80 shadow-xl shadow-blue-500/5">
      <CardHeader>
        <CardTitle className="text-2xl">Recommended Education Loan Providers</CardTitle>
        <p className="text-sm text-slate-500">
          Curated lenders matched to your profile and study plans.
        </p>
      </CardHeader>
      <CardContent>
        {lenders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-400">
            No lender recommendations available.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lenders.map((l, i) => <LenderCard key={i} lender={l} />)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LenderCard({ lender }: { lender: Lender }) {
  const riskTone = lender.risk?.toLowerCase() === "low"
    ? "bg-emerald-100 text-emerald-700"
    : lender.risk?.toLowerCase() === "medium"
    ? "bg-amber-100 text-amber-700"
    : "bg-rose-100 text-rose-700";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-2.5">
          <Building2 className="h-5 w-5 text-blue-600" />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${riskTone}`}>
          {lender.risk} risk
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{lender.name}</h3>

      <div className="mt-4 space-y-2 text-sm">
        <Row label="Interest Rate" value={lender.interest_rate} accent />
        <Row label="Max Amount" value={lender.max_amount} />
      </div>

      {lender.study_abroad && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 text-xs font-medium text-blue-700">
          <Plane className="h-3.5 w-3.5" />
          Supports International Education
        </div>
      )}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        Verified provider
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-slate-100 pb-2 last:border-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${accent ? "text-blue-600" : "text-slate-800"}`}>{value}</span>
    </div>
  );
}
