import React, { useState, useEffect } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [showInitialTextPart1, setShowInitialTextPart1] = useState(false);
  const [showInitialTextPart2, setShowInitialTextPart2] = useState(false);
  const [showInitialTextPart3, setShowInitialTextPart3] = useState(false);
  const [hideInitialText, setHideInitialText] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [showPresents, setShowPresents] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showCopyright, setShowCopyright] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    // Show first part: "An engineer is missing…" (after a pause to take in the black screen)
    const part1Timer = setTimeout(() => {
      setShowInitialTextPart1(true);
    }, 1000); // 1 second pause for negative space

    // Show second part: "from your team" (on same line)
    const part2Timer = setTimeout(() => {
      setShowInitialTextPart2(true);
    }, 3000); // 1.5 seconds after part 1

    // Show third part: "Intel suggests she can be found here." (next line)
    const part3Timer = setTimeout(() => {
      setShowInitialTextPart3(true);
    }, 4500); // 1.5 seconds after part 2

    // Hide initial text after it's been shown for a while
    const hideInitialTextTimer = setTimeout(() => {
      setHideInitialText(true);
    }, 7000); // Show for 2.5 seconds after part 3 appears

    // Start main content animations after initial text fades out
    const mainContentTimer = setTimeout(() => {
      setShowMainContent(true);
      // Show circle after a brief delay
      setShowCircle(true);
    }, 8000); // Start after initial text phase completes

    const presentsTimer = setTimeout(() => {
      setShowPresents(true);
    }, 9000); // 8000 + 1000

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 10000); // 8000 + 2000

    const startButtonTimer = setTimeout(() => {
      setShowStartButton(true);
    }, 11000); // 8000 + 3000

    const copyrightTimer = setTimeout(() => {
      setShowCopyright(true);
    }, 11500); // 8000 + 3500

    return () => {
      clearTimeout(part1Timer);
      clearTimeout(part2Timer);
      clearTimeout(part3Timer);
      clearTimeout(hideInitialTextTimer);
      clearTimeout(mainContentTimer);
      clearTimeout(presentsTimer);
      clearTimeout(textTimer);
      clearTimeout(startButtonTimer);
      clearTimeout(copyrightTimer);
    };
  }, []);

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsButtonClicked(true);
    setIsClosing(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // Match the fade out animation duration
  };

  return (
    <div 
      className={`intro-screen ${isClosing ? 'closing' : ''}`}
    >
      {/* Initial text that appears first on black screen */}
      <div className={`intro-initial-text ${hideInitialText ? 'hidden' : ''}`}>
        <div className="intro-initial-text-line">
          <span className={`intro-initial-text-part ${showInitialTextPart1 ? 'visible' : ''}`}>
            An engineer is missing…    
          </span>
          <span className={`intro-initial-text-part ${showInitialTextPart2 ? 'visible' : ''}`}>
            {' '}  from your team.
          </span>
        </div>
        <div className={`intro-initial-text-line ${showInitialTextPart3 ? 'visible' : ''}`}>
          Intel suggests she can be found here.
        </div>
      </div>

      {/* Main content - only shown after initial text phase */}
      {showMainContent && (
        <>
          <div className={`intro-circle ${showCircle ? 'visible' : ''}`}></div>
          
          <div className={`intro-presents ${showPresents ? 'visible' : ''}`}>
            <div className="presents-line-1">Liza Halykina</div>
            <div className="presents-line-2">Presents</div>
          </div>
          
          <div className={`intro-text-container ${showText ? 'visible' : ''}`}>
            <div className="intro-text-line">The <span className="curious-case">Curious Case</span> of a</div>
            <div className="intro-text-line intro-text-large">missing engineer</div>
          </div>

          
          <button 
            className={`intro-start-button ${showStartButton ? 'visible' : ''} ${isButtonClicked ? 'clicked' : ''}`}
            onClick={handleStart}
          >
            <span className="intro-start-button-text">Investigate</span>
          </button>
          
          <div className={`intro-copyright ${showCopyright ? 'visible' : ''}`}>
            © 2025 Liza Halykina<br />
            All Rights Reserved
          </div>
        </>
      )}

      {/* Floating under construction text */}
      <div className="intro-under-construction">
        This game is currently under construction
      </div>
    </div>
  );
};

export default IntroScreen;

