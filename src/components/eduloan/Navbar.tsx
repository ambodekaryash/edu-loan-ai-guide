import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onAssessClick: () => void;
}

export function Navbar({ onAssessClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-2">
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-2 text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-base font-bold text-slate-900">EduLoan Advisor AI</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#assess" className="hover:text-slate-900">Assessment</a>
          <a href="#emi" className="hover:text-slate-900">EMI</a>
          <a href="#features" className="hover:text-slate-900">Features</a>
        </nav>
        <Button
          size="sm"
          onClick={onAssessClick}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
}
