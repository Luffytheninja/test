import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import AnimatedNumber from './AnimatedNumber';

interface SummaryHeaderProps {
  annualIncome: number;
  annualTax: number;
  currency?: string;
}

export default function SummaryHeader({
  annualIncome,
  annualTax,
  currency = '₦',
}: SummaryHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="bg-zinc-900/50 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden mb-8 shadow-2xl shadow-emerald-900/10 border border-white/5">
      {/* Background Accents - Green Gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-900/10 rounded-full blur-[80px] -ml-10 -mb-10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Total Annual Income
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl md:text-2xl font-medium text-emerald-600/80">
                {currency}
              </span>
              <h2 className="text-4xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white truncate w-full">
                {isVisible ? <AnimatedNumber value={annualIncome} /> : '•••••••'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md border border-white/5 flex-shrink-0"
          >
            {isVisible ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <div className="flex-1 min-w-0">
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
              Est. Tax Liability
            </p>
            <div className="text-2xl md:text-3xl font-black text-white truncate">
              {isVisible ? (
                <span className="flex items-center gap-1">
                  <span className="text-base text-gray-600 font-normal">{currency}</span>
                  <AnimatedNumber value={annualTax} />
                </span>
              ) : (
                '••••••'
              )}
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="flex-1 min-w-0">
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
              Effective Rate
            </p>
            <div className="text-2xl md:text-3xl font-black text-emerald-400">
              {annualIncome > 0 ? ((annualTax / annualIncome) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
