import React from 'react';
import { useTax } from '../../contexts/TaxContext';
import { Input, Button, Badge } from '@antigravity/ui';
import { Plus, Building2, Heart, Receipt, Trash2 } from 'lucide-react';

const ExpenseStep: React.FC = () => {
    const { inputs, updateInputs, deleteExpense } = useTax();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Core Deductions */}
                <div className="space-y-6 p-6 rounded-2xl bg-warm-50 border border-warm-100">
                    <div className="flex items-center gap-3 text-warm-900 mb-2">
                        <Building2 className="w-5 h-5 text-coral-500" />
                        <h3 className="font-bold">Core Deductions</h3>
                    </div>

                    <Input
                        label="Annual Rent (₦)"
                        type="number"
                        value={inputs.rentPaid}
                        onChange={(e) => updateInputs({ rentPaid: Number(e.target.value) })}
                        placeholder="500,000"
                        description="Max relief capped at ₦500k"
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-warm-700">Monthly Utilities (₦)</label>
                        <div className="flex gap-4">
                            <Input
                                type="number"
                                value={inputs.monthlyUtilities}
                                onChange={(e) => updateInputs({ monthlyUtilities: Number(e.target.value) })}
                                className="flex-1"
                            />
                            <div className="w-24">
                                <Input
                                    type="number"
                                    value={inputs.utilityPercentage}
                                    onChange={(e) => updateInputs({ utilityPercentage: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-warm-500 uppercase tracking-wider">Business usage %</p>
                    </div>
                </div>

                {/* Specialized Reliefs */}
                <div className="space-y-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-3 text-emerald-900 mb-2">
                        <Heart className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold">Insurance & Savings</h3>
                    </div>

                    <Input
                        label="Life Insurance Premium (₦)"
                        type="number"
                        value={inputs.lifePremium}
                        onChange={(e) => updateInputs({ lifePremium: Number(e.target.value) })}
                        placeholder="Annual amount"
                    />

                    <Input
                        label="Voluntary Pension (₦)"
                        type="number"
                        value={inputs.voluntaryPension}
                        onChange={(e) => updateInputs({ voluntaryPension: Number(e.target.value) })}
                        placeholder="Annual amount"
                    />
                </div>
            </div>

            {/* Expense Tracker Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-coral-500" />
                        <h3 className="font-bold text-warm-900">Project Expenses</h3>
                    </div>
                    <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Expense
                    </Button>
                </div>

                {inputs.expenseEntries.length === 0 ? (
                    <div className="bg-warm-50/50 rounded-xl border border-dashed border-warm-200 p-12 text-center text-warm-400">
                        No business expenses tracked yet.
                    </div>
                ) : (
                    <div className="rounded-xl border border-warm-100 overflow-hidden bg-white">
                        <table className="w-full text-sm">
                            <thead className="bg-warm-50 text-warm-500 text-left">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-warm-50">
                                {inputs.expenseEntries.slice(-5).reverse().map((entry: any) => (
                                    <tr key={entry.id}>
                                        <td className="px-4 py-3 text-warm-900">{entry.description}</td>
                                        <td className="px-4 py-3"><Badge variant="outline">{entry.category}</Badge></td>
                                        <td className="px-4 py-3 text-right text-red-600 font-bold">₦{Number(entry.amount).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => deleteExpense(entry.id)} className="text-warm-300 hover:text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseStep;
