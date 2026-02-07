import { DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils';
import { TaxResults } from '../types';

interface TakeHomeAndOptimizationProps {
  results: TaxResults;
  lifePremium: number;
}

export default function TakeHomeAndOptimization({
  results,
  lifePremium,
}: TakeHomeAndOptimizationProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* Take Home */}
      <div className="ios-card bg-indigo-600 p-8 text-white border-0 shadow-xl shadow-indigo-200">
        <h2 className="ios-section-header text-white border-white/20 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Take-Home Pay
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider">
              Monthly
            </p>
            <p className="text-5xl font-bold tracking-tight">
              {formatCurrency(results.monthlyTakeHome)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider">
                Annual
              </p>
              <p className="text-xl font-bold">{formatCurrency(results.annualTakeHome)}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-wider">
                Eff. Rate
              </p>
              <p className="text-xl font-bold">
                {((results.annualTax / results.annualGross) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization */}
      <div className="ios-card p-8">
        <h2 className="ios-section-header flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          Insurance Match
        </h2>

        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-700 mb-2">Life Insurance Cap (20% of gross)</p>
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(results.maxLifeRelief)}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-2">Currently Using</p>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(results.lifeInsuranceRelief)}
            </p>
          </div>

          {results.lifeInsuranceUnused > 0 && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4">
              <p className="text-sm text-amber-700 mb-2 font-semibold">
                💡 Optimization Opportunity
              </p>
              <p className="text-gray-700 mb-2">
                You can increase life insurance by{' '}
                <span className="font-bold">{formatCurrency(results.lifeInsuranceUnused)}</span>
              </p>
              <p className="text-green-700 font-bold">
                Potential Annual Tax Savings: {formatCurrency(results.potentialTaxSavings)}
              </p>
              <p className="text-green-600 text-sm">
                (Monthly: {formatCurrency(results.potentialTaxSavings / 12)})
              </p>
            </div>
          )}

          {results.lifeInsuranceUnused === 0 && lifePremium > 0 && (
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
              <p className="text-green-700 font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Life Insurance Fully Optimized!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
