import { motion } from 'framer-motion';
import { useTax } from '../contexts/TaxContext';
import {
    BarChart3,
    TrendingUp,
    Wallet,
    Receipt,
    History,
    ShieldCheck,
    Plus
} from 'lucide-react';
import { Card, Button, Badge } from '@antigravity/ui';

export default function StudioDashboard() {
    const { results, inputs, userCategory } = useTax();

    if (!results) return null;

    return (
        <div className="ios-canvas space-y-12 pb-20">
            {/* Header Section */}
            <header className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-xs">
                    <ShieldCheck size={14} />
                    Certified 2025 Tax Engine
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
                    Nigeria Studio Core
                </h1>
                <p className="text-neutral-500 max-w-lg">
                    Your holistic financial command center, optimized for the latest {userCategory} tax reforms.
                </p>
            </header>

            {/* Hero Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="p-8 bg-neutral-900 text-white border-0 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-white/5 transition-transform group-hover:scale-110">
                            <BarChart3 size={120} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Est. Annual Tax</span>
                            <div className="text-4xl font-display font-bold">
                                ₦{Math.round(results.annualTax).toLocaleString()}
                            </div>
                            <Badge variant="success" className="bg-white/10 text-white border-0">
                                {((results.annualTax / results.annualGross) * 100).toFixed(1)}% Effective Rate
                            </Badge>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-8 bg-surface-1 border-white/20 shadow-sm">
                        <div className="space-y-4">
                            <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Net Take-Home</span>
                            <div className="text-4xl font-display font-bold text-neutral-900">
                                ₦{Math.round(results.annualTakeHome).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                                <TrendingUp size={16} />
                                ₦{Math.round(results.monthlyTax).toLocaleString()} monthly tax
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="p-8 bg-primary/5 border-primary/10 shadow-sm relative overflow-hidden">
                        <div className="space-y-4">
                            <span className="text-primary/70 text-xs font-bold uppercase tracking-widest">Tax Efficiency</span>
                            <div className="text-4xl font-display font-bold text-primary">
                                {results.potentialTaxSavings > 0 ? 'Action Needed' : 'Optimized'}
                            </div>
                            <p className="text-neutral-600 text-sm">
                                {results.potentialTaxSavings > 0
                                    ? `Save ₦${results.potentialTaxSavings.toLocaleString()} annually`
                                    : 'You are using all available reliefs.'}
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </section>

            {/* Module Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Income Module */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                            <Wallet className="text-primary" size={24} />
                            Income Stream
                        </h2>
                        <Button variant="ghost" size="sm" iconRight={<Plus size={16} />}>
                            Add Receipt
                        </Button>
                    </div>
                    <Card className="divide-y divide-neutral-100 overflow-hidden">
                        {inputs.incomeEntries.length > 0 ? (
                            inputs.incomeEntries.slice(0, 3).map((entry, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                                    <div>
                                        <div className="font-semibold text-neutral-900">{entry.description}</div>
                                        <div className="text-xs text-neutral-500">{entry.category}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-neutral-900">₦{Number(entry.amount).toLocaleString()}</div>
                                        <div className="text-[10px] text-neutral-400 font-mono uppercase">{new Date(entry.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-neutral-400 italic text-sm">
                                No income logged yet.
                            </div>
                        )}
                        <div className="p-4 text-center text-xs font-semibold text-primary hover:bg-primary/5 cursor-pointer">
                            View All Income Records
                        </div>
                    </Card>
                </div>

                {/* Expense Module */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                            <Receipt className="text-primary" size={24} />
                            Expense Studio
                        </h2>
                        <Button variant="ghost" size="sm" iconRight={<Plus size={16} />}>
                            Scan Receipt
                        </Button>
                    </div>
                    <Card className="divide-y divide-neutral-100 overflow-hidden">
                        {inputs.expenseEntries.length > 0 ? (
                            inputs.expenseEntries.slice(0, 3).map((entry, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                                    <div>
                                        <div className="font-semibold text-neutral-900">{entry.description}</div>
                                        <div className="text-xs text-neutral-500">{entry.category}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-red-600">₦{Number(entry.amount).toLocaleString()}</div>
                                        <Badge variant="outline" className="text-[10px] py-0">Deductible</Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-neutral-400 italic text-sm">
                                No expenses logged yet.
                            </div>
                        )}
                        <div className="p-4 text-center text-xs font-semibold text-primary hover:bg-primary/5 cursor-pointer">
                            View Tax History & Audits
                        </div>
                    </Card>
                </div>
            </section>

            {/* Advisor Banner */}
            <section>
                <Card className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 border-0 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <h3 className="text-2xl font-display font-bold text-white">Advanced Tax Optimization</h3>
                        <p className="text-white/60 text-sm leading-relaxed max-w-md">
                            Based on your revenue, we've identified 3 potential deductions you might be missing under the 2025 reforms. Let our AI Tax Advisor guide you through a session.
                        </p>
                        <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
                            <Button variant="primary">Start Advisor Session</Button>
                            <Button variant="glass" className="text-white">Learn About Reforms</Button>
                        </div>
                    </div>
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-2xl flex items-center justify-center p-8">
                        <History className="text-white/20 w-full h-full" />
                    </div>
                </Card>
            </section>
        </div>
    );
}
