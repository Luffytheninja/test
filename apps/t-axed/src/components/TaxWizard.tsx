import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTax } from '../contexts/TaxContext';
import { Card, Button } from '@antigravity/ui';
import {
    TrendingUp,
    TrendingDown,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import IncomeStep from './wizard/IncomeStep';
import ExpenseStep from './wizard/ExpenseStep';
import ReviewStep from './wizard/ReviewStep';

const steps = [
    { id: 'income', title: 'Revenue & Income', icon: TrendingUp },
    { id: 'expenses', title: 'Business Expenses', icon: TrendingDown },
    { id: 'review', title: 'Review & Optimize', icon: ShieldCheck },
];

export const TaxWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { results } = useTax();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentStepData = steps[currentStep];
    const StepIcon = currentStepData.icon;

    return (
        <div className="max-w-3xl mx-auto space-y-8 py-8">
            {/* Progress Header */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`flex items-center gap-2 transition-opacity ${index === currentStep ? 'opacity-100' : 'opacity-40'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index <= currentStep ? 'bg-coral-500 text-white' : 'bg-warm-200 text-warm-500'
                                }`}>
                                {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                            </div>
                            <span className="hidden md:block text-sm font-medium text-warm-900">{step.title}</span>
                        </div>
                    ))}
                </div>
                <div className="h-1.5 w-full bg-warm-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-coral-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <Card className="p-8 space-y-6 bg-white/80 backdrop-blur-xl border-warm-200/50 shadow-warm-xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-coral-50 flex items-center justify-center text-coral-600">
                                    <StepIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-warm-900">{currentStepData.title}</h2>
                                    <p className="text-warm-500 text-sm">Step {currentStep + 1} of {steps.length}</p>
                                </div>
                            </div>

                            <div className="py-4">
                                {currentStep === 0 && <IncomeStep />}
                                {currentStep === 1 && <ExpenseStep />}
                                {currentStep === 2 && <ReviewStep />}
                            </div>

                            <div className="flex justify-between items-center pt-8 border-t border-warm-100">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </Button>

                                <Button
                                    variant="primary"
                                    onClick={handleNext}
                                    disabled={currentStep === steps.length - 1}
                                    className="flex items-center gap-2 group"
                                >
                                    {currentStep === steps.length - 2 ? 'Review Calculation' : 'Continue'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Quick Summary Sticky (Optional) */}
            {results && currentStep < 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-warm-900 text-white px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl backdrop-blur-lg"
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider opacity-60">Estimated Tax</span>
                        <span className="text-lg font-bold">₦{Math.round(results.annualTax).toLocaleString()}</span>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider opacity-60">Effective Rate</span>
                        <span className="text-lg font-bold">15%</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
