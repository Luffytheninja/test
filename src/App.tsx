import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTax } from './contexts/TaxContext';
import { Navbar, Footer } from '@antigravity/ui';
import { TaxWizard } from './components/TaxWizard';
import TutorialOverlay from './components/TutorialOverlay';
import OnboardingFlow from './components/OnboardingFlow';
import StudioDashboard from './components/StudioDashboard';

export default function App() {
  const { updateInputs, updateUserCategory } = useTax();
  const [activeTab] = useState('dashboard');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // Default to true for development

  return (
    <div data-theme="dark" className="ios-shell selection:bg-primary/30">
      <Navbar
        user={{
          name: "Ayo",
          email: "ayo@antigravity.dev",
          avatar: "/avatars/ayo.jpg"
        }}
      />

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <StudioDashboard />
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full"
            >
              <TaxWizard />
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

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingFlow
            onComplete={(data) => {
              updateInputs({ monthlyIncome: data.annualIncome / 12 });
              updateUserCategory(data.category);
              setShowOnboarding(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

