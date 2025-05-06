'use client';

import { useState, useEffect } from 'react';
import ProgressBar from '../../components/ProgressBar';
import styles from './page.module.css';

export default function ProgressDemo() {
  const [progress, setProgress] = useState(70);
  const [autoProgress, setAutoProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progressColor, setProgressColor] = useState('#4caf50');
  const [height, setHeight] = useState(20);
  const [showPercentage, setShowPercentage] = useState(true);
  
  // Handle manual progress change
  const handleProgressChange = (e) => {
    setProgress(Number(e.target.value));
  };
  
  // Handle auto progress
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setAutoProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    } else if (!isRunning && autoProgress === 100) {
      setAutoProgress(0);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, autoProgress]);
  
  // Handle color change
  const handleColorChange = (e) => {
    setProgressColor(e.target.value);
  };
  
  // Handle height change
  const handleHeightChange = (e) => {
    setHeight(Number(e.target.value));
  };
  
  // Toggle percentage display
  const togglePercentage = () => {
    setShowPercentage(!showPercentage);
  };
  
  // Reset auto progress
  const resetAutoProgress = () => {
    setAutoProgress(0);
    setIsRunning(false);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Progress Bar Demo</h1>
      
      <section className={styles.section}>
        <h2>Basic Progress Bar</h2>
        <ProgressBar progress={progress} />
        
        <div className={styles.controls}>
          <label htmlFor="progress">Adjust Progress: {progress}%</label>
          <input 
            type="range" 
            id="progress" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleProgressChange} 
            className={styles.slider}
          />
        </div>
      </section>
      
      <section className={styles.section}>
        <h2>Auto-Updating Progress Bar</h2>
        <ProgressBar progress={autoProgress} progressColor="#2196f3" />
        
        <div className={styles.controls}>
          <button 
            onClick={() => setIsRunning(!isRunning)} 
            className={styles.button}
            disabled={autoProgress === 100}
          >
            {isRunning ? 'Pause' : autoProgress === 100 ? 'Completed' : 'Start'}
          </button>
          
          <button 
            onClick={resetAutoProgress} 
            className={styles.button}
          >
            Reset
          </button>
        </div>
      </section>
      
      <section className={styles.section}>
        <h2>Customizable Progress Bar</h2>
        <ProgressBar 
          progress={progress} 
          progressColor={progressColor}
          height={height}
          showPercentage={showPercentage}
        />
        
        <div className={styles.customControls}>
          <div className={styles.controlGroup}>
            <label htmlFor="color">Color:</label>
            <input 
              type="color" 
              id="color" 
              value={progressColor} 
              onChange={handleColorChange} 
              className={styles.colorPicker}
            />
          </div>
          
          <div className={styles.controlGroup}>
            <label htmlFor="height">Height: {height}px</label>
            <input 
              type="range" 
              id="height" 
              min="10" 
              max="50" 
              value={height} 
              onChange={handleHeightChange} 
              className={styles.slider}
            />
          </div>
          
          <div className={styles.controlGroup}>
            <label>
              <input 
                type="checkbox" 
                checked={showPercentage} 
                onChange={togglePercentage} 
              />
              Show Percentage
            </label>
          </div>
        </div>
      </section>
      
      <section className={styles.section}>
        <h2>Different Styles</h2>
        <div className={styles.multipleExamples}>
          <div>
            <p>Success</p>
            <ProgressBar progress={80} progressColor="#4caf50" />
          </div>
          
          <div>
            <p>Warning</p>
            <ProgressBar progress={60} progressColor="#ff9800" />
          </div>
          
          <div>
            <p>Danger</p>
            <ProgressBar progress={30} progressColor="#f44336" />
          </div>
          
          <div>
            <p>Info</p>
            <ProgressBar progress={45} progressColor="#2196f3" />
          </div>
          
          <div>
            <p>Custom Height (30px)</p>
            <ProgressBar progress={75} height={30} />
          </div>
        </div>
      </section>
    </div>
  );
}
