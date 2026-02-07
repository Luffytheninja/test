import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { UserCategory } from '@antigravity/tax-engine';
import { Button, Card, Badge, Input } from '@antigravity/ui';
import SplashScreen from './SplashScreen';

interface OnboardingFlowProps {
  onComplete: (data: {
    residency: boolean;
    annualIncome: number;
    category: UserCategory;
    ninCAC?: string;
  }) => void;
}

const categories: { id: UserCategory; label: string; description: string }[] = [
  { id: 'PAYE', label: 'Salary Earner', description: 'Monthly payroll with tax deducted at source' },
  { id: 'SmallBusiness', label: 'Small Business', description: 'Annual revenue under ₦50M (Tax Exempt)' },
  { id: 'Professional', label: 'Freelancer', description: 'Consultants, creatives, and independent pros' },
  { id: 'DigitalNomad', label: 'Digital Nomad', description: 'Working globally with offshore income' },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(1);
  const [residency, setResidency] = useState<boolean | null>(null);
  const [income, setIncome] = useState('');
  const [category, setCategory] = useState<UserCategory>('PAYE');
  const [idNumber, setIdNumber] = useState('');

  const nextStep = () => setStep(step + 1);

  const handleComplete = () => {
    onComplete({
      residency: residency || false,
      annualIncome: Number(income),
      category: category,
      ninCAC: idNumber,
    });
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-warm-50/50 backdrop-blur-3xl flex flex-col justify-center items-center p-6">
      <div className="max-w-md w-full space-y-8 mb-20">
        {/* Progress Header */}
        <div className="flex justify-center gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${step >= s ? 'w-10 bg-coral-500' : 'w-4 bg-warm-200'
                }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Step 1: Welcome & Auth */}
            {step === 1 && (
              <Card className="p-8 text-center space-y-6 bg-white/80 backdrop-blur-xl border-warm-200/50 shadow-warm-xl">
                <div className="w-20 h-20 bg-coral-50 rounded-3xl mx-auto flex items-center justify-center text-coral-600">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-warm-900 tracking-tight">Welcome to T-Axed</h2>
                  <p className="text-warm-500 text-sm">Let's turn your tax chaos into clarity in 2 minutes.</p>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="primary" size="lg" onClick={nextStep} className="w-full h-14 text-lg">
                    Get Started
                  </Button>
                  <Button variant="ghost" onClick={nextStep} className="text-warm-400">
                    I'll explore first
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Residency */}
            {step === 2 && (
              <Card className="p-8 text-center space-y-6 bg-white/80 backdrop-blur-xl border-warm-200/50 shadow-warm-xl">
                <div className="w-20 h-20 bg-warm-100 rounded-3xl mx-auto flex items-center justify-center text-warm-600">
                  <MapPin className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-warm-900 tracking-tight">Residency</h2>
                  <p className="text-warm-500 text-sm leading-relaxed">
                    Have you spent more than 183 days in Nigeria this year?
                  </p>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="outline" size="lg" onClick={() => { setResidency(true); nextStep(); }} className="h-14 text-lg">
                    Yes, I live here
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => { setResidency(false); nextStep(); }} className="h-14 text-lg text-warm-500 border-warm-200">
                    No, I'm visiting
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Income */}
            {step === 3 && (
              <Card className="p-8 text-center space-y-8 bg-white/80 backdrop-blur-xl border-warm-200/50 shadow-warm-xl">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl mx-auto flex items-center justify-center text-emerald-600 font-bold text-4xl">
                  ₦
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-warm-900 tracking-tight">Annual Income</h2>
                  <p className="text-warm-500 text-sm">Estimated total for the year</p>
                </div>
                <div className="space-y-6">
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                    className="w-full text-center text-5xl font-bold bg-transparent border-0 focus:ring-0 text-warm-900 placeholder-warm-100"
                  />
                  {Number(income) > 0 && Number(income) <= 800000 && (
                    <Badge variant="success" className="w-full py-3 px-4 justify-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      TAX-FREE SAFE ZONE QUALIFIED
                    </Badge>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!income}
                    onClick={nextStep}
                    className="w-full h-14 text-lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 4: Category */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-3xl font-bold text-warm-900 tracking-tight">Your Profile</h2>
                  <p className="text-warm-500 text-sm text-center">Select the category that fits you best.</p>
                </div>
                <div className="grid gap-4">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCategory(cat.id);
                        nextStep();
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${category === cat.id
                        ? 'bg-white border-coral-500 shadow-warm-lg ring-4 ring-coral-50'
                        : 'bg-white/60 border-warm-100 hover:border-warm-200'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="font-bold text-warm-900">{cat.label}</p>
                          <p className="text-xs text-warm-400">{cat.description}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 ${category === cat.id ? 'text-coral-500' : 'text-warm-300'}`} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: ID / Finish */}
            {step === 5 && (
              <Card className="p-8 text-center space-y-8 bg-white/80 backdrop-blur-xl border-warm-200/50 shadow-warm-xl">
                <div className="w-20 h-20 bg-warm-900 rounded-3xl mx-auto flex items-center justify-center text-white">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-warm-900 tracking-tight">Almost Done</h2>
                  <p className="text-warm-500 text-sm">Link your NIN or CAC number for full automation.</p>
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter NIN or CAC"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="h-14 text-center text-lg"
                  />
                  <div className="flex flex-col gap-3 pt-4">
                    <Button variant="primary" size="lg" onClick={handleComplete} className="w-full h-14 text-lg">
                      Go to Dashboard
                    </Button>
                    <button onClick={handleComplete} className="text-warm-400 text-xs font-bold uppercase tracking-widest pt-2">
                      Skip for now
                    </button>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="fixed bottom-10 text-[10px] font-bold text-warm-300 uppercase tracking-[0.3em]">
        Antigravity • T-Axed 2026
      </p>
    </div>
  );
}
