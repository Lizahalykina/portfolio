import React from 'react';
import './LoadingScreen.css'; 

interface LoadingScreenProps {
  startAnimations: boolean;
  fadeOut: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ startAnimations, fadeOut }) => {
  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className={`loading-content ${startAnimations ? 'animate' : ''}`}>
        <div className={`magnifying-glass ${startAnimations ? 'animate' : ''}`}>
          <span role="img" aria-label="magnifying glass">🔍</span>
        </div>
        <h1 className={`typing-animation ${startAnimations ? 'animate' : ''}`}>Loading Investigation...</h1>
        <p className={`loading-text ${startAnimations ? 'animate' : ''}`}>Uncovering clues, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
