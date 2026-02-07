import React from 'react';
import { useTax } from '../../contexts/TaxContext';
import { Card, Alert, Button } from '@antigravity/ui';
import {
    BarChart3,
    TrendingUp,
    Info,
    Sparkles,
    ArrowUpRight
} from 'lucide-react';

const ReviewStep: React.FC = () => {
    const { results } = useTax();

    if (!results) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* High Level Summary */}
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6 bg-warm-900 text-white border-0">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-warm-400 text-xs font-bold uppercase tracking-widest">Annual Tax Due</span>
                        <BarChart3 className="w-5 h-5 text-coral-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold">₦{Math.round(results.annualTax).toLocaleString()}</h3>
                        <p className="text-warm-400 text-xs mt-1">
                            ₦{Math.round(results.monthlyTax).toLocaleString()} / month
                        </p>
                    </div>
                </Card>

                <Card className="p-6 bg-white border-warm-100 shadow-warm-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-warm-500 text-xs font-bold uppercase tracking-widest">Net Take-Home</span>
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-warm-900">₦{Math.round(results.annualTakeHome).toLocaleString()}</h3>
                        <p className="text-warm-500 text-xs mt-1">
                            {((results.annualTakeHome / results.annualGross) * 100).toFixed(1)}% of revenue
                        </p>
                    </div>
                </Card>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-4">
                <h3 className="font-bold text-warm-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-warm-400" />
                    Calculation Breakdown
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm py-2 border-b border-warm-50">
                        <span className="text-warm-600">Annual Gross Revenue</span>
                        <span className="font-semibold text-warm-900">₦{results.annualGross.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-warm-50">
                        <span className="text-warm-600">Total Business Deductions</span>
                        <span className="font-semibold text-red-600">-₦{results.totalDeductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-warm-50">
                        <span className="text-warm-600">Tax-Free Allowance</span>
                        <span className="font-semibold text-warm-400">-₦{results.taxFreeAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-warm-100/50">
                        <span className="text-warm-900 font-bold">Chargeable Income</span>
                        <span className="font-bold text-warm-900">₦{results.chargeableIncome.toLocaleString()}</span>
                    </div>

                    {/* Tax Bands Breakdown */}
                    {results.taxBands.map((band: any) => band.taxableInBand > 0 && (
                        <div key={band.rate} className="flex justify-between text-[11px] py-1 pl-4 border-l-2 border-warm-100 ml-2">
                            <span className="text-warm-400 font-medium">Band {band.rate}% on ₦{band.taxableInBand.toLocaleString()}</span>
                            <span className="text-warm-600 font-bold">₦{Math.round(band.taxInBand).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Optimization Tooltip */}
            {results.potentialTaxSavings > 0 && (
                <Alert variant="warning" className="bg-amber-50 border-amber-200">
                    <div className="flex gap-3">
                        <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-amber-900">Optimization Opportunity Found!</p>
                            <p className="text-xs text-amber-800 leading-relaxed">
                                By investing an additional <span className="font-bold">₦{results.potentialAdditionalLife.toLocaleString()}</span> in life insurance,
                                you could save <span className="font-bold text-emerald-700">₦{results.potentialTaxSavings.toLocaleString()}</span> in tax annually.
                            </p>
                            <Button variant="outline" size="sm" className="bg-white border-amber-200 text-amber-900 text-xs">
                                Learn how it works
                                <ArrowUpRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    </div>
                </Alert>
            )}
        </div>
    );
};

export default ReviewStep;
