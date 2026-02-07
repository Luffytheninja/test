import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Banknote, Coins } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counting animation for the localized feel
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Auto-complete after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-blue-600 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Falling Bills Animation */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bill-${i}`}
          className="absolute text-white/10"
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 2,
          }}
        >
          <Banknote size={48 + Math.random() * 48} />
        </motion.div>
      ))}

      {/* Falling Coins Animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`coin-${i}`}
          className="absolute text-yellow-300/20"
          initial={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            y: window.innerHeight + 50,
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 3,
          }}
        >
          <Coins size={24 + Math.random() * 24} />
        </motion.div>
      ))}

      <div className="z-10 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl inline-block"
        >
          <Banknote className="w-20 h-20 text-white" />
        </motion.div>

        <motion.h1
          className="text-5xl font-black text-white tracking-tighter"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          T-Axed <span className="text-yellow-300">.</span>
        </motion.h1>

        <div className="flex flex-col items-center">
          <p className="text-blue-100 font-medium tracking-widest uppercase text-xs mb-2">
            Simplicity Loading
          </p>
          <motion.div className="text-4xl font-bold text-white tabular-nums">{count}%</motion.div>
        </div>
      </div>
    </motion.div>
  );
}
