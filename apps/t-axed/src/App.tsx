import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTax } from './contexts/TaxContext';
import { Navbar, Footer } from '@antigravity/ui';
import { TaxWizard } from './components/TaxWizard';
import TutorialOverlay from './components/TutorialOverlay';
import OnboardingFlow from './components/OnboardingFlow';

export default function App() {
  const { updateInputs, updateUserCategory } = useTax();
  const [activeTab] = useState('dashboard');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-warm-50/30 flex flex-col font-sans selection:bg-coral-100 selection:text-coral-900">
      <Navbar
        user={{
          name: "Ayo",
          email: "ayo@antigravity.dev",
          avatar: "/avatars/ayo.jpg"
        }}
      />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <TaxWizard />
            </motion.div>
          ) : (
            <motion.div
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-warm-500"
            >
              {/* Other tabs like Settings or History would go here */}
              Coming Soon
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer
        sections={[
          {
            title: "Resources",
            links: [
              { label: "Tax FAQ", href: "/faq" },
              { label: "2025 Reforms", href: "/reforms" }
            ]
          }
        ]}
        legalItems={[
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" }
        ]}
      />

      {/* Overlays */}
      <TutorialOverlay isOpen={showTutorial} onClose={() => setShowTutorial(false)} />

      {showOnboarding && (
        <OnboardingFlow
          onComplete={(data) => {
            updateInputs({ monthlyIncome: data.annualIncome / 12 });
            updateUserCategory(data.category);
            setShowOnboarding(false);
          }}
        />
      )}
    </div>
  );
}
