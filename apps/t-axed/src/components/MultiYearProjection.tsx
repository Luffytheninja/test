import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency } from '../utils';
import { TaxResults } from '../types';

interface MultiYearProjectionProps {
  results: TaxResults;
  lifePremium: number;
}

export default function MultiYearProjection({ results, lifePremium }: MultiYearProjectionProps) {
  const [showMultiYear, setShowMultiYear] = useState(false);

  const getMultiYearProjection = () => {
    if (!results) return [];
    const years = [];
    const growthRate = 0.1;

    for (let i = 0; i < 5; i++) {
      const yearIncome = results.annualGross * Math.pow(1 + growthRate, i);
      const yearPension = yearIncome * 0.08;
      const yearNhf = yearIncome * 0.025;
      const yearMaxLife = yearIncome * 0.2;
      const yearLifeRelief = Math.min(lifePremium, yearMaxLife); // Assumes premium stays constant
      const yearDeductions =
        yearPension + yearNhf + yearLifeRelief + results.rentRelief + results.totalBusinessExpenses;
      const yearNet = yearIncome - yearDeductions;
      const yearChargeable = Math.max(0, yearNet - 800000);
      const yearTax = yearChargeable * 0.15;
      const yearTakeHome = yearIncome - yearTax;

      years.push({
        year: 2026 + i,
        income: yearIncome,
        tax: yearTax,
        takeHome: yearTakeHome,
        effectiveRate: ((yearTax / yearIncome) * 100).toFixed(1),
      });
    }

    return years;
  };

  const projectionData = getMultiYearProjection();

  return (
    <div className="ios-card p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="ios-section-header mb-0 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Growth Projection
        </h2>
        <button onClick={() => setShowMultiYear(!showMultiYear)} className="ios-btn-secondary px-6">
          {showMultiYear ? 'Hide' : 'Show'}
        </button>
      </div>

      {showMultiYear && (
        <div className="space-y-8">
          <div className="ios-input-group p-4 !bg-white/50">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => formatCurrency(Number(value))}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 800,
                    paddingTop: '20px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="tax"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                  name="Tax"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {projectionData.map((year) => (
              <div
                key={year.year}
                className="ios-card bg-white/40 border-white/50 p-4 transition-all hover:border-indigo-200"
              >
                <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 leading-none">
                  {year.year}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">
                      Take-Home
                    </p>
                    <p className="text-xs font-bold text-gray-900 leading-none">
                      {formatCurrency(year.takeHome)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">
                      Eff. Rate
                    </p>
                    <p className="text-xs font-bold text-indigo-600 leading-none">
                      {year.effectiveRate}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50/50 border-l-4 border-indigo-500 p-5 rounded-xl">
            <p className="text-[11px] font-medium text-indigo-900 leading-relaxed">
              <strong className="block mb-1 font-bold uppercase tracking-widest text-[9px]">
                Growth Analysis
              </strong>
              Based on a 10% annual scale-up, your annual tax contribution will adjust from{' '}
              <span className="font-bold">{formatCurrency(results.annualTax)}</span> to{' '}
              <span className="font-bold">{formatCurrency(projectionData[4].tax)}</span> by 2030.
              Maintaining consistent insurance relief is critical for long-term optimization.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
