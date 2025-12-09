import React, { useState, useRef, useEffect } from 'react';
import './CharacterFile.css';
import CaseFileInfo from '../CaseFileInfo/CaseFileInfo';
import CloseButton from '../../Common/CloseButton/CloseButton';



interface CharacterFileProps {
  onClose: () => void;
  isEntering?: boolean;
}

const FULL_TEXT = "An engineer is missing…\n\nfrom your team.\n\nIntel suggests she can be found here.";

const CharacterFile: React.FC<CharacterFileProps> = ({ onClose, isEntering = false }) => {
  const [ isBookOpen, setIsBookOpen] = useState(false);
  const [ isConfidentialHidden, setIsConfidentialHidden] = useState(false);
  const [ isCoverContentHidden, setisCoverContentHidden] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFlipDone, setIsFlipDone] = useState(false);
  const [typedText, setTypedText] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);

  const handlePageFlip = () => {
    setIsBookOpen(true);
    setTimeout(() => {
        setisCoverContentHidden(true);
    }, 800);
    setTimeout(() => {
      setIsConfidentialHidden(true);
    }, 1400);
  };

  // Typing animation effect - completes before page flip (3000ms) and case file (4400ms)
  useEffect(() => {
    if (isEntering) {
      setTypedText('');
      let currentIndex = 0;
      const typingSpeed = 30; // milliseconds per character - ensures completion before 3000ms
      
      const typingInterval = setInterval(() => {
        if (currentIndex < FULL_TEXT.length) {
          setTypedText(FULL_TEXT.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [isEntering]);

  useEffect(() => {
    if (isEntering) {
      const timer = setTimeout(() => {
        handlePageFlip();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isEntering]);

  const handlePageFlipEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === pageRef.current && e.propertyName === 'transform') {
      setIsFlipDone(true);
    }
  };

  const handleCloseBook =() => {
    setIsBookOpen(false);
    setIsClosing(true);
    setIsConfidentialHidden(false);
    setisCoverContentHidden(false);
    setIsFlipDone(false);
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <div className={`case-screen ${isClosing ? 'closing' : ''} ${isEntering ? 'entering' : ''}`}>
    <div className="book-body">
      <div className={`book ${isBookOpen ? 'open' : ''}`}>
        <div className="cover">
          <div className="cover-edge"></div>
          <div className={`cover-content ${isCoverContentHidden ? 'hidden' : 'visible'}`}>
            <h1 className="cover-title">Confidential Candidate Dossier</h1>
            <p className="cover-description">
              {typedText.split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
              {typedText.length < FULL_TEXT.length && <span className="typing-cursor">|</span>}
            </p>
          </div>
        </div>
        <div 
          className="page"
          ref={pageRef}
          onTransitionEnd={handlePageFlipEnd}
        >
          <div className="page-edge"></div>
          <div className="page-inner">
            <div className="page-front">
              <img
                src="/assets/confidential-stamp.png"
                alt="Confidential Stamp"
                className={`confidential ${isConfidentialHidden ? 'hidden' : 'visible'}`}
              />
            </div>
            <div className="page-back">
              {isConfidentialHidden && (
                <div 
                  className="page-back-content"
                  style={{
                    transform: isBookOpen ? 'rotateY(180deg) scaleX(-1)' : 'none'
                  }}
                >
                  <CaseFileInfo page={1}/>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="last-page">
          <div className="last-page-edge"></div>
          <div className="last-page-content">
            <CaseFileInfo page={2}/>
          </div>
        </div>
        <div className="back-cover">
          <div className="back-cover-edge"></div>
        </div>
        {isBookOpen && (
          <CloseButton onClick={handleCloseBook} className="book-close-button" />
        )}
      </div>
    </div>
    </div>
  );
};

export default CharacterFile;
