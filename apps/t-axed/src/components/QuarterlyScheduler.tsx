import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { formatCurrency } from '../utils';
import { TaxResults } from '../types';

interface QuarterlySchedulerProps {
  results: TaxResults;
}

export default function QuarterlyScheduler({ results }: QuarterlySchedulerProps) {
  const [showQuarterly, setShowQuarterly] = useState(false);

  const getQuarterlyPayments = () => {
    if (!results) return [];
    const quarterlyTax = results.annualTax / 4;
    return [
      { quarter: 'Q1 (Jan-Mar)', amount: quarterlyTax, dueDate: 'April 30, 2026', status: 'Due' },
      {
        quarter: 'Q2 (Apr-Jun)',
        amount: quarterlyTax,
        dueDate: 'July 31, 2026',
        status: 'Upcoming',
      },
      {
        quarter: 'Q3 (Jul-Sep)',
        amount: quarterlyTax,
        dueDate: 'October 31, 2026',
        status: 'Upcoming',
      },
      {
        quarter: 'Q4 (Oct-Dec)',
        amount: quarterlyTax,
        dueDate: 'January 31, 2027',
        status: 'Upcoming',
      },
    ];
  };

  return (
    <div className="ios-card p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="ios-section-header mb-0 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          Payment Schedule
        </h2>
        <button onClick={() => setShowQuarterly(!showQuarterly)} className="ios-btn-secondary px-6">
          {showQuarterly ? 'Hide' : 'Show'}
        </button>
      </div>

      {showQuarterly && (
        <div className="space-y-4">
          {getQuarterlyPayments().map((payment, idx) => (
            <div
              key={idx}
              className="ios-input-group !bg-white/50 hover:border-indigo-200 transition-all cursor-default"
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shadow-sm ${payment.status === 'Due' ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-none mb-1">
                      {payment.quarter}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {payment.dueDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 leading-none mb-1">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest ${payment.status === 'Due' ? 'text-red-600' : 'text-gray-400'}`}
                  >
                    {payment.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-red-50/50 border-l-4 border-red-500 p-4 rounded-xl mt-6">
            <p className="text-[11px] font-medium text-red-800 leading-relaxed">
              <strong className="block mb-1">⚠️ LATE PAYMENT PENALTY</strong>
              Payments must be received by 11:59 PM on the due date to avoid the mandatory ₦100,000
              NTAA penalty.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
