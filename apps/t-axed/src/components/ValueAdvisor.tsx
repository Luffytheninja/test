import { TrendingUp, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils';
import { TaxResults } from '../types';

interface ValueAdvisorProps {
  results: TaxResults;
}

export default function ValueAdvisor({ results }: ValueAdvisorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* Value Proposition Card */}
      <div className="ios-card bg-gradient-to-br from-emerald-900 to-green-900 p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12">
          <Shield className="w-64 h-64" />
        </div>

        <div className="relative z-10">
          <h2 className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Optimization Engine
          </h2>

          <div className="mb-8">
            <span className="text-4xl font-black tracking-tight block mb-1">
              {formatCurrency(results.potentialTaxSavings)}
            </span>
            <span className="text-emerald-200 text-sm font-medium">
              Potential Annual Savings Available
            </span>
          </div>

          <div className="space-y-4">
            {/* Life Insurance Opportunity */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-all hover:bg-white/15">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Life Premium Relief
                </span>
                {results.lifeInsuranceUnused > 0 ? (
                  <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    Action Required
                  </span>
                ) : (
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Maxed
                  </span>
                )}
              </div>

              {results.lifeInsuranceUnused > 0 ? (
                <div>
                  <p className="text-sm text-gray-200 mb-2">
                    Increase your premium by{' '}
                    <span className="font-bold text-white">
                      {formatCurrency(results.lifeInsuranceUnused)}
                    </span>{' '}
                    to save an additional{' '}
                    <span className="font-bold text-emerald-300">
                      {formatCurrency(results.potentialTaxSavings)}
                    </span>{' '}
                    in taxes.
                  </p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-amber-400"
                      style={{
                        width: `${(results.lifeInsuranceRelief / results.maxLifeRelief) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-right mt-1 text-white/50">
                    {Math.round((results.lifeInsuranceRelief / results.maxLifeRelief) * 100)}%
                    Utilized
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-200">
                  You have fully utilized your Life Insurance relief cap of{' '}
                  {formatCurrency(results.maxLifeRelief)}. Excellent capital efficiency.
                </p>
              )}
            </div>

            {/* Pension Opportunity (Mock for design) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-all hover:bg-white/15">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                  Pension (8%)
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Auto-Applied
                </span>
              </div>
              <p className="text-sm text-gray-200">
                Statutory deduction of {formatCurrency(results.pension)} applied automatically as a
                tax shield.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Tips / Advisory */}
      <div className="space-y-6">
        <div className="ios-card bg-orange-50/50 border-orange-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Rent as a Shield</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Did you know your Lagos rent payment might be partially deductible? While not a
                direct relief, documenting it builds your "Cost of Living" profile for future
                assessments.
              </p>
              {/* <button className="text-[11px] font-bold uppercase tracking-widest text-orange-600 flex items-center gap-1 hover:gap-2 transition-all">
                                Learn Strategy <ArrowUpRight className="w-3 h-3" />
                            </button> */}
            </div>
          </div>
        </div>

        <div className="ios-card bg-emerald-50/50 border-emerald-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">The 1% Rule</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Always aim to invest at least 1% of your gross income back into business tools. This
                qualifies as "Operating Expense" and lowers your taxable exposure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
