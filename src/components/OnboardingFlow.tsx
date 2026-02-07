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
import { Button, Badge } from '@antigravity/ui';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-white"
    >
      {/* Background Nigeria Noir Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-navy/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Progress System */}
        <div className="flex justify-center gap-3 mb-16">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${step >= s ? 'w-12 bg-primary' : 'w-4 bg-white/10'
                }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="flex flex-col items-center text-center"
          >
            {/* Step 1: The Invitation */}
            {step === 1 && (
              <div className="space-y-10">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-primary/10 rounded-[2rem] mx-auto flex items-center justify-center text-primary shadow-glow-cta"
                >
                  <Sparkles className="w-12 h-12" />
                </motion.div>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight">
                    Chaos into <span className="text-primary italic">Clarity.</span>
                  </h1>
                  <p className="text-neutral-400 text-xl max-w-lg mx-auto">
                    Welcome to the Studio. Let's automate your taxes in 2 minutes.
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-8">
                  <Button variant="primary" size="lg" onClick={nextStep} className="h-16 px-12 text-xl rounded-warm">
                    Begin Journey
                  </Button>
                  <button onClick={nextStep} className="text-neutral-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold">
                    I'll explore first
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Residency */}
            {step === 2 && (
              <div className="space-y-10">
                <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto flex items-center justify-center text-neutral-300">
                  <MapPin className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-display font-bold">Where's your home base?</h2>
                  <p className="text-neutral-400 text-lg">
                    Have you spent more than 183 days in Nigeria this year?
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-4 w-full max-w-sm mx-auto">
                  <Button variant="secondary" size="lg" onClick={() => { setResidency(true); nextStep(); }} className="h-16 text-xl border-white/10 bg-white/5 hover:bg-white/10">
                    Yes, I live here
                  </Button>
                  <Button variant="secondary" size="lg" onClick={() => { setResidency(false); nextStep(); }} className="h-16 text-xl border-white/10 bg-white/5 hover:bg-white/10 opacity-60">
                    No, I'm visiting
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Income (The Hero Input) */}
            {step === 3 && (
              <div className="space-y-12 w-full">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold">The Numbers.</h2>
                  <p className="text-neutral-400 text-lg">What's your estimated annual income?</p>
                </div>
                <div className="relative group">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-5xl md:text-7xl font-bold text-primary/30 group-focus-within:text-primary transition-colors">₦</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0"
                    autoFocus
                    className="w-full text-center text-6xl md:text-9xl font-display font-bold bg-transparent border-0 focus:ring-0 text-white placeholder-white/5 pl-12"
                  />
                </div>
                {Number(income) > 0 && Number(income) <= 800000 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Badge variant="success" className="py-4 px-8 rounded-full glass-light border-success/30 text-success text-lg">
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      TAX-FREE SAFE ZONE
                    </Badge>
                  </motion.div>
                )}
                <div className="pt-8 w-full max-w-xs mx-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!income}
                    onClick={nextStep}
                    className="w-full h-16 text-xl rounded-warm"
                  >
                    Continue
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Category */}
            {step === 4 && (
              <div className="space-y-8 w-full max-w-xl mx-auto">
                <div className="text-center space-y-4 mb-10">
                  <h2 className="text-4xl font-display font-bold">Your Identity.</h2>
                  <p className="text-neutral-400 text-lg">Select the profile that fits your work.</p>
                </div>
                <div className="grid gap-4">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCategory(cat.id);
                        nextStep();
                      }}
                      className={`p-8 rounded-[2rem] border transition-all text-left flex items-center justify-between ${category === cat.id
                        ? 'bg-white/10 border-primary shadow-glow-cta'
                        : 'bg-white/5 border-white/5'
                        }`}
                    >
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-white">{cat.label}</p>
                        <p className="text-sm text-neutral-400">{cat.description}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${category === cat.id ? 'border-primary bg-primary' : 'border-white/20'
                        }`}>
                        {category === cat.id && <ChevronRight className="w-5 h-5 text-black" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: ID / Finish */}
            {step === 5 && (
              <div className="space-y-12 w-full max-w-md mx-auto">
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-24 h-24 bg-white rounded-[2rem] mx-auto flex items-center justify-center text-black shadow-2xl"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold">Final Polish.</h2>
                  <p className="text-neutral-400 text-lg">Link your NIN or CAC for full studio automation.</p>
                </div>
                <div className="space-y-6">
                  <input
                    placeholder="Enter NIN or CAC (Optional)"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full text-center text-2xl font-medium bg-white/5 border-b-2 border-white/10 focus:border-primary transition-colors py-6 focus:ring-0 placeholder:text-neutral-700"
                  />
                  <div className="flex flex-col gap-6 pt-6">
                    <Button variant="primary" size="lg" onClick={handleComplete} className="h-16 text-xl rounded-warm">
                      Enter Dashboard
                    </Button>
                    <button onClick={handleComplete} className="text-neutral-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold">
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-24 text-center text-[10px] font-bold text-neutral-600 uppercase tracking-[0.5em] opacity-50">
          DESIGNED FOR NIGERIA • ANTIGRAVITY STUDIO
        </p>
      </div>
    </motion.div>
  );
}
