import React, { useState, useEffect } from 'react';

export const Countdown: React.FC = () => {
  const calculateTimeLeft = () => {
    const launchDate = new Date("2026-01-10T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = launchDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-4 md:gap-6 text-center mt-6 p-4 border-y border-concrete/20 bg-black/50 backdrop-blur-sm w-full">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center min-w-[32px] md:min-w-[40px]">
          <span className="font-heading text-base md:text-lg text-gold font-bold">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-concrete-light font-ui mt-1">
            {unit}
          </span>
        </div>
      ))}
      <div className="hidden md:flex flex-col justify-center ml-4 pl-8 border-l border-concrete/20">
        <span className="font-ui text-[8px] text-white uppercase tracking-[0.2em] mb-1">Global Launch</span>
        <span className="font-heading text-[9px] text-gold">JANUARY 10, 2026</span>
      </div>
    </div>
  );
};