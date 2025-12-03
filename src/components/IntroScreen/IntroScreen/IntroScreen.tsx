import React, { useState, useEffect } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [showCircle, setShowCircle] = useState(false);
  const [showPresents, setShowPresents] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCopyright, setShowCopyright] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show circle after a brief delay
    const circleTimer = setTimeout(() => {
      setShowCircle(true);
    }, 500);

    const presentsTimer = setTimeout(() => {
      setShowPresents(true);
    }, 1500);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2500);

    const copyrightTimer = setTimeout(() => {
      setShowCopyright(true);
    }, 4000);

    return () => {
      clearTimeout(circleTimer);
      clearTimeout(presentsTimer);
      clearTimeout(textTimer);
      clearTimeout(copyrightTimer);
    };
  }, []);

  const handleClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // Match the fade out animation duration
  };

  return (
    <div 
      className={`intro-screen ${isClosing ? 'closing' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={`intro-circle ${showCircle ? 'visible' : ''}`}></div>
      
      <div className={`intro-presents ${showPresents ? 'visible' : ''}`}>
        <div className="presents-line-1">Liza Halykina</div>
        <div className="presents-line-2">Presents</div>
      </div>
      
      <div className={`intro-text-container ${showText ? 'visible' : ''}`}>
        <div className="intro-text-line">The <span className="curious-case">Curious Case</span> of a</div>
        <div className="intro-text-line intro-text-large">missing engineer</div>
      </div>
      
      <div className={`intro-copyright ${showCopyright ? 'visible' : ''}`}>
        © 2025 Liza Halykina<br />
        All Rights Reserved
      </div>
    </div>
  );
};

export default IntroScreen;

