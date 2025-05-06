'use client';

import { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ 
  progress = 0, 
  height = 20, 
  backgroundColor = '#e0e0de', 
  progressColor = '#4caf50',
  showPercentage = true,
  animated = true,
  max = 100
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    // Animate the progress change
    if (animated) {
      const timer = setTimeout(() => {
        if (currentProgress < progress) {
          setCurrentProgress(prev => Math.min(prev + 1, progress));
        } else if (currentProgress > progress) {
          setCurrentProgress(prev => Math.max(prev - 1, progress));
        }
      }, 10);
      
      return () => clearTimeout(timer);
    } else {
      setCurrentProgress(progress);
    }
  }, [currentProgress, progress, animated]);

  const percentage = Math.round((currentProgress / max) * 100);
  
  return (
    <div className={styles.progressContainer} style={{ height: `${height}px`, backgroundColor }}>
      <div 
        className={styles.progressFiller} 
        style={{ 
          width: `${percentage}%`, 
          backgroundColor: progressColor,
          transition: animated ? 'width 0.1s ease-in-out' : 'none'
        }}
      >
        {showPercentage && (
          <span className={styles.progressLabel}>{percentage}%</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
