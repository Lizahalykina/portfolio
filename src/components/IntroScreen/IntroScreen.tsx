import React from 'react';
import './IntroScreen.css';

const IntroScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="intro-screen">
      <div className="intro-content">
        <h3>Welcome to My porfolio Game!</h3>
        <p>So glad to have you here. This project is still at a rough stage, but I hope it shows some of my coding skills and processes.</p>
        <button onClick={onClose}>Start</button>
      </div>
    </div>
  );
};

export default IntroScreen;
