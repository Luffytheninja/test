import { Calculator, Mail, Share2, HelpCircle, Printer } from 'lucide-react';

interface HeaderProps {
  showEmailScheduler: boolean;
  onToggleEmailScheduler: () => void;
  onExportCSV: () => void;
  onShowTutorial: () => void;
}

export default function Header({
  showEmailScheduler,
  onToggleEmailScheduler,
  onExportCSV,
  onShowTutorial,
}: HeaderProps) {
  return (
    <div className="mb-10 px-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-xl shadow-sm border border-white/10">
          <Calculator className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white leading-none mb-1">BKT</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              Compliant · 2025
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onShowTutorial}
          className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-emerald-500 transition-all shadow-sm hover:bg-white/10"
          title="How to use this app"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button
          onClick={() => window.print()}
          className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 transition-all shadow-sm hidden md:block"
          title="Print Report"
        >
          <Printer className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleEmailScheduler}
          className={`p-3 rounded-2xl transition-all duration-300 border ${showEmailScheduler ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
        >
          <Mail className="w-5 h-5" />
        </button>
        <button
          onClick={onExportCSV}
          className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 transition-all shadow-sm"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
