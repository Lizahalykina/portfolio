import React, { useState } from 'react';
import './CharacterFile.css';
import CaseFileInfo from '../CaseFileInfo/CaseFileInfo';



const CharacterFile: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [ isBookOpen, setIsBookOpen] = useState(false);
  const [ isConfidentialHidden, setIsConfidentialHidden] = useState(false);
  const [ isCoverContentHidden, setisCoverContentHidden] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handlePageFlip = () => {
    setIsBookOpen(true);
    setTimeout(() => {
        setisCoverContentHidden(true);
    }, 800);
    setTimeout(() => {
      setIsConfidentialHidden(true);
    }, 1400);
  };

  const handleCloseBook =() => {
    setIsBookOpen(false);
    setIsClosing(true);
    setIsConfidentialHidden(false);
    setisCoverContentHidden(false);
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <div className={`case-screen ${isClosing ? 'closing' : ''}`}>
    <div className="book-body">
      <div className={`book ${isBookOpen ? 'open' : ''}`}>
        <div className="cover" onMouseEnter={handlePageFlip}>
          <div className="cover-edge"></div>
          <div className={`cover-content ${isCoverContentHidden ? 'hidden' : 'visible'}`}>
            <h1 className="cover-title">Confidential Candidate Dossier</h1>
            <p className="cover-description">
              Hiring Manager, within this file lies the profile of a software engineer whose skills and experience 
              could be the missing piece to your team’s puzzle. Hover over to unlock the details and uncover 
              the story behind the code. But be sharp—finding the perfect fit is a case that requires precision. 
              The next key hire might be just one page away.
            </p>
          </div>
        </div>
        <div className="page">
          <div className="page-edge"></div>
          <img
            src="/assets/confidential-stamp.png"
            alt="Confidential Stamp"
            className={`confidential ${isConfidentialHidden ? 'hidden' : 'visible'}`}
          />
        </div>
        <div className="last-page">
          <div className="last-page-edge"></div>
          <div className="last-page-content">
            <CaseFileInfo></CaseFileInfo>
          </div>
        </div>
        <div className="back-cover">
          <div className="back-cover-edge"></div>
        </div>
        {isBookOpen && (
        <div className="close-button" onClick={handleCloseBook}>
          X
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default CharacterFile;
