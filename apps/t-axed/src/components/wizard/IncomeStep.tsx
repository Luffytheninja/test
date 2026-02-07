import React from 'react';
import { useTax } from '../../contexts/TaxContext';
import { Input, Button, Badge } from '@antigravity/ui';
import { Plus, Wallet, Receipt, Trash2 } from 'lucide-react';

const IncomeStep: React.FC = () => {
    const { inputs, updateInputs, deleteIncome } = useTax();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 p-6 rounded-2xl bg-warm-50 border border-warm-100">
                    <div className="flex items-center gap-3 text-warm-900 mb-2">
                        <Wallet className="w-5 h-5 text-coral-500" />
                        <h3 className="font-bold">Manual Income</h3>
                    </div>
                    <p className="text-xs text-warm-500">Preferred if you have a stable monthly salary</p>
                    <Input
                        label="Monthly Salary (₦)"
                        type="number"
                        value={inputs.monthlyIncome}
                        onChange={(e) => updateInputs({ monthlyIncome: Number(e.target.value) })}
                        placeholder="e.g. 250,000"
                    />
                </div>

                <div className="space-y-4 p-6 rounded-2xl bg-coral-50 border border-coral-100">
                    <div className="flex items-center gap-3 text-coral-900 mb-2">
                        <Receipt className="w-5 h-5 text-coral-500" />
                        <h3 className="font-bold">Income Tracker</h3>
                    </div>
                    <p className="text-xs text-coral-600">Track varying revenue from clients & projects</p>
                    <div className="pt-2">
                        <Button variant="outline" className="w-full bg-white border-coral-200 text-coral-600 hover:bg-coral-50">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project Payment
                        </Button>
                    </div>
                </div>
            </div>

            {inputs.incomeEntries.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-warm-900">Recent Transactions</h3>
                        <Badge variant="secondary">{inputs.incomeEntries.length} entries</Badge>
                    </div>
                    <div className="rounded-xl border border-warm-100 overflow-hidden bg-white">
                        <table className="w-full text-sm">
                            <thead className="bg-warm-50 text-warm-500 text-left">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-warm-50">
                                {inputs.incomeEntries.slice(-5).reverse().map((entry: any) => (
                                    <tr key={entry.id} className="hover:bg-warm-50/50 transition-colors">
                                        <td className="px-4 py-3 text-warm-500">{entry.date}</td>
                                        <td className="px-4 py-3 text-warm-900 font-medium">{entry.description}</td>
                                        <td className="px-4 py-3 text-right text-emerald-600 font-bold">
                                            ₦{Number(entry.amount).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => deleteIncome(entry.id)}
                                                className="text-warm-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IncomeStep;
