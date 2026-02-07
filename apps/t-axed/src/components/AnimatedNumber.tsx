import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  format?: (val: number) => string;
  className?: string;
}

export default function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const spring = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current: number) => {
    return format ? format(current) : Math.round(current).toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
