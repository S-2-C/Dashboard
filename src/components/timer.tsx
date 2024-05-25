// components/Timer.tsx
import { useState, useEffect } from 'react';

interface TimerProps {
  startTime: string;
}

const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      setTimeElapsed(now - start);
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getColor = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    if (totalSeconds <= 10 * 60) {
        return interpolateColor('#089439', '#00CD1F', totalSeconds / (15 * 60)); // Green to Blue
    } else if (totalSeconds <= 20 * 60) {
        return interpolateColor('#00CD1F', '#E8E800', (totalSeconds - 15 * 60) / (10 * 60)); // Blue to Yellow
    } else if (totalSeconds <= 30 * 60) {
        return interpolateColor('#E8E800', '#E3680D', (totalSeconds - 15 * 60) / (10 * 60)); // Blue to Yellow
    }else if (totalSeconds <= 35 * 60) {
        return interpolateColor('#E3680D', '#C31F08', (totalSeconds - 25 * 60) / (10 * 60)); // Yellow to Red
    } else {
        return '#C31F08'; // Red
    }
  };

  return (
    <div className='text-3xl font-sans' style={{ color: getColor(timeElapsed), fontWeight: 'bold' }}>
      {formatTime(timeElapsed)}
    </div>
  );
};

const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hex = (color: string) => {
      color = color.replace(/^#/, '');
      if (color.length === 3) {
        color = color.split('').map(char => char + char).join('');
      }
      return color;
    };
  
    const hex1 = hex(color1);
    const hex2 = hex(color2);
  
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
  
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
  
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
  
    const rgb = (r << 16) + (g << 8) + b;
    return `#${rgb.toString(16).padStart(6, '0')}`;
  };

export default Timer;
