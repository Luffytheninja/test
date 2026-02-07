import { useEffect, useState } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

export default function DeadlineCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentYear = new Date().getFullYear();
      // Default to March 31st of current year, or next year if passed
      let deadline = new Date(`March 31, ${currentYear} 23:59:59`);
      if (new Date() > deadline) {
        deadline = new Date(`March 31, ${currentYear + 1} 23:59:59`);
      }

      const difference = +deadline - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const isUrgent = timeLeft.days < 30;

  return (
    <div
      className={`rounded-xl p-4 flex items-center justify-between shadow-sm border ${isUrgent ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-200'} mb-6`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}
        >
          {isUrgent ? <AlertTriangle className="w-5 h-5" /> : <Timer className="w-5 h-5" />}
        </div>
        <div>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest block ${isUrgent ? 'text-red-500' : 'text-gray-400'}`}
          >
            Filing Deadline
          </span>
          <span className={`text-sm font-bold ${isUrgent ? 'text-red-900' : 'text-gray-900'}`}>
            March 31st Compliance
          </span>
        </div>
      </div>

      <div className="flex gap-2 text-center">
        <div className="bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm min-w-[3rem]">
          <span className="text-xl font-black block leading-none">{timeLeft.days}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase">Days</span>
        </div>
        <div className="bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm min-w-[3rem]">
          <span className="text-xl font-black block leading-none">{timeLeft.hours}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase">Hrs</span>
        </div>
      </div>
    </div>
  );
}
