import React from 'react';
import './LoadingScreen.css'; 

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="magnifying-glass">
          <span role="img" aria-label="magnifying glass">🔍</span>
        </div>
        <h1>Loading Investigation...</h1>
        <p className="loading-text">Uncovering clues, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
