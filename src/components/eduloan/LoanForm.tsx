import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, Wallet, FileCheck2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { PredictRequest } from "@/lib/api";

interface LoanFormProps {
  onSubmit: (payload: PredictRequest, contact: { name: string; email: string; phone: string }) => void;
  loading: boolean;
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  gender: "1",
  married: "1",
  dependents: "0",
  education: "1",
  selfEmployed: "0",
  applicantIncome: "5000",
  coapplicantIncome: "2000",
  loanAmount: "120",
  loanTerm: "360",
  creditHistory: "1",
  propertyArea: "2",
};

export function LoanForm({ onSubmit, loading }: LoanFormProps) {
  const [form, setForm] = useState(initialForm);

  const update = (k: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      toast.error("Please provide your name and email.");
      return;
    }
    const payload: PredictRequest = {
      Gender: Number(form.gender),
      Married: Number(form.married),
      Dependents: Number(form.dependents),
      Education: Number(form.education),
      Self_Employed: Number(form.selfEmployed),
      ApplicantIncome: Number(form.applicantIncome),
      CoapplicantIncome: Number(form.coapplicantIncome),
      LoanAmount: Number(form.loanAmount),
      Loan_Amount_Term: Number(form.loanTerm),
      Credit_History: Number(form.creditHistory),
      Property_Area: Number(form.propertyArea),
    };
    onSubmit(payload, { name: form.fullName, email: form.email, phone: form.phone });
  };

  const showComingSoon = () => {
    toast.info("Document Intelligence is coming soon", {
      description:
        "Document Intelligence using Google Vision API and Gemini is coming soon. This feature will automatically extract academic and financial details from uploaded documents and auto-fill the application form.",
      duration: 6000,
    });
  };

  return (
    <Card className="border-slate-200/80 shadow-xl shadow-blue-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Loan Eligibility Assessment
        </CardTitle>
        <p className="text-sm text-slate-500">
          Fill in your details to receive an AI-powered approval prediction with full explanations.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="Personal Information" icon={<User className="h-4 w-4" />}>
            <Field label="Full Name">
              <Input value={form.fullName} onChange={(e) => update("fullName")(e.target.value)} placeholder="John Doe" />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(e) => update("email")(e.target.value)} placeholder="john@example.com" />
            </Field>
            <Field label="Phone Number">
              <Input value={form.phone} onChange={(e) => update("phone")(e.target.value)} placeholder="+91 9876543210" />
            </Field>
          </Section>

          <Section title="Loan Features" icon={<FileCheck2 className="h-4 w-4" />}>
            <Field label="Gender">
              <SelectField value={form.gender} onChange={update("gender")} options={[
                { value: "1", label: "Male" }, { value: "0", label: "Female" },
              ]} />
            </Field>
            <Field label="Married">
              <SelectField value={form.married} onChange={update("married")} options={[
                { value: "1", label: "Yes" }, { value: "0", label: "No" },
              ]} />
            </Field>
            <Field label="Dependents">
              <Input type="number" min={0} value={form.dependents} onChange={(e) => update("dependents")(e.target.value)} />
            </Field>
            <Field label="Education">
              <SelectField value={form.education} onChange={update("education")} options={[
                { value: "1", label: "Graduate" }, { value: "0", label: "Non Graduate" },
              ]} />
            </Field>
            <Field label="Self Employed">
              <SelectField value={form.selfEmployed} onChange={update("selfEmployed")} options={[
                { value: "1", label: "Yes" }, { value: "0", label: "No" },
              ]} />
            </Field>
          </Section>

          <Section title="Financial Information" icon={<Wallet className="h-4 w-4" />}>
            <Field label="Applicant Income">
              <Input type="number" value={form.applicantIncome} onChange={(e) => update("applicantIncome")(e.target.value)} />
            </Field>
            <Field label="Coapplicant Income">
              <Input type="number" value={form.coapplicantIncome} onChange={(e) => update("coapplicantIncome")(e.target.value)} />
            </Field>
            <Field label="Loan Amount (in thousands)">
              <Input type="number" value={form.loanAmount} onChange={(e) => update("loanAmount")(e.target.value)} />
            </Field>
            <Field label="Loan Term (months)">
              <Input type="number" value={form.loanTerm} onChange={(e) => update("loanTerm")(e.target.value)} />
            </Field>
          </Section>

          <Section title="Credit Information" icon={<FileCheck2 className="h-4 w-4" />}>
            <Field label="Credit History">
              <SelectField value={form.creditHistory} onChange={update("creditHistory")} options={[
                { value: "1", label: "Good" }, { value: "0", label: "Poor" },
              ]} />
            </Field>
            <Field label="Property Area">
              <SelectField value={form.propertyArea} onChange={update("propertyArea")} options={[
                { value: "2", label: "Urban" }, { value: "1", label: "Semiurban" }, { value: "0", label: "Rural" },
              ]} />
            </Field>
          </Section>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Upload className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-800">Upload Documents (Coming Soon)</h3>
            </div>
            <button
              type="button"
              onClick={showComingSoon}
              className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-8 text-center transition hover:border-blue-400 hover:from-blue-50 hover:to-purple-50"
            >
              <div className="rounded-full bg-white p-3 shadow-sm transition group-hover:scale-110">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-slate-700">Drag & drop your documents here</div>
              <div className="text-xs text-slate-500">Transcripts, income proofs, ID — auto-fills your form (coming soon)</div>
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing with AI...</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Predict My Loan Approval</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">{title}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-slate-600">{label}</Label>
      {children}
    </div>
  );
}

function SelectField({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
