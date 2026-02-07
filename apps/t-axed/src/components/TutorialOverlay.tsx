import { useState } from 'react';
import {
  X,
  ChevronRight,
  LayoutDashboard,
  Receipt,
  TrendingUp,
  UserCircle,
  CheckCircle2,
} from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: any;
  color: string;
}

const steps: TutorialStep[] = [
  {
    title: 'Welcome!',
    description:
      'T-Axed helps you keep track of your business money and handles your tax the right way. It is safe and very easy to use.',
    icon: CheckCircle2,
    color: 'text-blue-600',
  },
  {
    title: '1. Business Info',
    description:
      "Click the 'Business' button (the person icon). Put in how much you make every month and your shop rent. We use this to figure out your tax.",
    icon: UserCircle,
    color: 'text-purple-600',
  },
  {
    title: '2. Record Money',
    description:
      "Go to the 'Tracking' page (the paper icon). Every time you get money or spend money for work, put it here. No need for paper receipts!",
    icon: Receipt,
    color: 'text-emerald-600',
  },
  {
    title: '3. See Your Profit',
    description:
      "The 'Summary' page (the squares icon) shows you how much money is yours to keep and how much to pay for tax.",
    icon: LayoutDashboard,
    color: 'text-indigo-600',
  },
  {
    title: '4. Save More Money',
    description:
      "The 'Strategy' page (the arrow icon) show you how to pay less tax by using Insurance or Pension benefits.",
    icon: TrendingUp,
    color: 'text-blue-500',
  },
];

interface TutorialOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialOverlay({ isOpen, onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const closeTutorial = () => {
    localStorage.setItem('taxed_tutorial_seen', 'true');
    onClose();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
      closeTutorial();
    }
  };

  if (!isOpen) return null;

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="ios-card max-w-sm w-full p-8 relative overflow-hidden bg-white shadow-2xl">
        <button
          onClick={closeTutorial}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 active:scale-90 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-20 h-20 rounded-[24px] bg-gray-50 flex items-center justify-center mb-6 shadow-sm ${steps[currentStep].color}`}
          >
            <StepIcon className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
            {steps[currentStep].title}
          </h2>

          <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-8">
            {steps[currentStep].description}
          </p>

          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>

          <button onClick={nextStep} className="w-full ios-btn-primary py-4 text-lg">
            {currentStep === steps.length - 1 ? 'Start Using App' : 'Next Tip'}
            <ChevronRight className="w-5 h-5" />
          </button>

          {currentStep < steps.length - 1 && (
            <button
              onClick={closeTutorial}
              className="mt-4 text-gray-400 text-sm font-bold uppercase tracking-widest hover:text-gray-600 transition-colors"
            >
              Skip Tutorial
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
