import React, { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

const CountdownTimer = () => {
  const targetDate = new Date("2025-09-05T15:00:00Z");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <div className={styles.timerItem}>
          <span className={styles.timerValue}>{timeLeft.days}</span>
          <p className={styles.timerSubtitle}>Days</p>
        </div>
        <span>:</span>
        <div className={styles.timerItem}>
          <span className={styles.timerValue}>{timeLeft.hours}</span>
          <p className={styles.timerSubtitle}>Hours</p>
        </div>
        <span>:</span>
        <div className={styles.timerItem}>
          <span className={styles.timerValue}>{timeLeft.minutes}</span>
          <p className={styles.timerSubtitle}>Minutes</p>
        </div>
        <span>:</span>
        <div className={styles.timerItem}>
          <span className={styles.timerValue}>{timeLeft.seconds}</span>
          <p className={styles.timerSubtitle}>Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
