import React, { useState, useRef, useEffect } from 'react';
import './CharacterFile.css';
import CaseFileInfo from '../CaseFileInfo/CaseFileInfo';
import CloseButton from '../../Common/CloseButton/CloseButton';



interface CharacterFileProps {
  onClose: () => void;
  isEntering?: boolean;
}

const CharacterFile: React.FC<CharacterFileProps> = ({ onClose, isEntering = false }) => {
  const [ isBookOpen, setIsBookOpen] = useState(false);
  const [ isConfidentialHidden, setIsConfidentialHidden] = useState(false);
  const [ isCoverContentHidden, setisCoverContentHidden] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFlipDone, setIsFlipDone] = useState(false);
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

  useEffect(() => {
    if (isEntering) {
      const timer = setTimeout(() => {
        handlePageFlip();
      }, 1500);
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
            This case file holds the essentials—skills, background, and a few clues about the engineer running this operation. The file will open automatically.
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
