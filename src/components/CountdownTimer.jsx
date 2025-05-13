import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <p className="text-lg font-bold text-jugnu-orange">Deployment is Live!</p>;
  }

  return (
    <div className="text-center bg-jugnu-dark/10 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-jugnu-cyan">Time Until Deployment</h2>
      <div className="flex justify-center space-x-4 text-white">
        <div>
          <p className="text-4xl font-bold">{timeLeft.days}</p>
          <p className="text-sm">Days</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{timeLeft.hours}</p>
          <p className="text-sm">Hours</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{timeLeft.minutes}</p>
          <p className="text-sm">Minutes</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{timeLeft.seconds}</p>
          <p className="text-sm">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;