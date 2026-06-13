import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Loader2, IndianRupee, Wallet, PiggyBank } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { calculateEmi, type EmiResponse } from "@/lib/api";
import { toast } from "sonner";

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [rate, setRate] = useState("9");
  const [years, setYears] = useState("10");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmiResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await calculateEmi({
        loan_amount: Number(loanAmount),
        interest_rate: Number(rate),
        tenure_years: Number(years),
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      toast.error("EMI calculation failed", { description: "Could not reach backend. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  const chartData = result
    ? [
        { name: "Principal", value: Number(loanAmount), color: "#3b82f6" },
        { name: "Interest", value: result.interest_paid, color: "#a855f7" },
      ]
    : [];

  return (
    <Card className="border-slate-200/80 shadow-xl shadow-blue-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="h-5 w-5 text-purple-600" />
          EMI Calculator
        </CardTitle>
        <p className="text-sm text-slate-500">
          Plan your monthly repayment, total payment and interest outflow.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-600">Loan Amount (₹)</Label>
              <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-600">Interest Rate (% per annum)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-600">Tenure (Years)</Label>
              <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...</> : <>Calculate EMI</>}
            </Button>
          </form>

          <div>
            {loading ? (
              <Skeleton />
            ) : result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Stat icon={<IndianRupee className="h-4 w-4" />} label="Monthly EMI" value={`₹${inr(result.monthly_emi)}`} tone="from-blue-500 to-blue-600" />
                  <Stat icon={<Wallet className="h-4 w-4" />} label="Total Payment" value={`₹${inr(result.total_payment)}`} tone="from-indigo-500 to-indigo-600" />
                  <Stat icon={<PiggyBank className="h-4 w-4" />} label="Total Interest" value={`₹${inr(result.interest_paid)}`} tone="from-purple-500 to-purple-600" />
                </div>
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-purple-50/30 p-4">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
                        {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `₹${inr(v)}`} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 text-xs">
                    <Legend color="#3b82f6" label="Principal" />
                    <Legend color="#a855f7" label="Interest" />
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${tone} p-4 text-white shadow-lg`}>
      <div className="flex items-center gap-1.5 text-xs opacity-90">{icon}{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      <span className="text-slate-600">{label}</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />)}
      </div>
      <div className="h-60 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
      <Calculator className="h-10 w-10 text-slate-300" />
      <div className="mt-3 text-sm font-medium text-slate-600">No calculation yet</div>
      <div className="text-xs text-slate-400">Enter your loan details to see EMI breakdown.</div>
    </div>
  );
}
