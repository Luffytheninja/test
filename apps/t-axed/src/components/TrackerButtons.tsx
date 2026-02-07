import { Receipt, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils';

interface TrackerButtonsProps {
  showIncomeTracker: boolean;
  setShowIncomeTracker: (val: boolean) => void;
  showExpenseTracker: boolean;
  setShowExpenseTracker: (val: boolean) => void;
  totalTrackedIncome: number;
  totalTrackedExpenses: number;
}

export default function TrackerButtons({
  showIncomeTracker,
  setShowIncomeTracker,
  showExpenseTracker,
  setShowExpenseTracker,
  totalTrackedIncome,
  totalTrackedExpenses,
}: TrackerButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => setShowIncomeTracker(!showIncomeTracker)}
        className={`text-left p-6 ios-card ios-card-hover relative overflow-hidden group transition-all duration-500 ${showIncomeTracker ? 'ring-2 ring-blue-500/50 bg-blue-50/30' : ''}`}
      >
        <div className="flex flex-col h-full relative z-10">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-colors duration-300 ${showIncomeTracker ? 'bg-blue-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}
          >
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Revenue</h3>
              {showIncomeTracker && (
                <ArrowUpRight className="w-3 h-3 text-blue-600 animate-bounce" />
              )}
            </div>
            <p
              className={`text-[10px] font-black uppercase tracking-wider mt-1 transition-colors ${showIncomeTracker ? 'text-blue-600' : 'text-gray-400'}`}
            >
              {totalTrackedIncome > 0 ? formatCurrency(totalTrackedIncome) : 'Tap to Log'}
            </p>
          </div>
        </div>
        {showIncomeTracker && (
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Receipt className="w-20 h-20 rotate-12" />
          </div>
        )}
      </button>

      <button
        onClick={() => setShowExpenseTracker(!showExpenseTracker)}
        className={`text-left p-6 ios-card ios-card-hover relative overflow-hidden group transition-all duration-500 ${showExpenseTracker ? 'ring-2 ring-red-500/50 bg-red-50/30' : ''}`}
      >
        <div className="flex flex-col h-full relative z-10">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-colors duration-300 ${showExpenseTracker ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Outflow</h3>
              {showExpenseTracker && (
                <ArrowDownRight className="w-3 h-3 text-red-600 animate-bounce" />
              )}
            </div>
            <p
              className={`text-[10px] font-black uppercase tracking-wider mt-1 transition-colors ${showExpenseTracker ? 'text-red-600' : 'text-gray-400'}`}
            >
              {totalTrackedExpenses > 0 ? formatCurrency(totalTrackedExpenses) : 'Tap to Log'}
            </p>
          </div>
        </div>
        {showExpenseTracker && (
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileText className="w-20 h-20 rotate-12" />
          </div>
        )}
      </button>
    </div>
  );
}
