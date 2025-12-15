import React, { useState, useEffect } from 'react';
import './ComputerScreen.css';
import CloseButton from '../Common/CloseButton/CloseButton';

interface ComputerScreenProps {
  open: boolean;
  onClose?: () => void;
}

const ComputerScreen: React.FC<ComputerScreenProps> = ({ open, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (open) {
      setIsEntering(true);
      setIsClosing(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsClosing(true);
    setIsEntering(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setIsClosing(false);
    }, 500); // Match animation duration
  };

  if (!open && !isClosing) return null;

  return (
    <div className={`computer-screen ${isClosing ? 'closing' : ''} ${isEntering ? 'entering' : ''}`}>
      <div className="computer-screen-background">
        {/* Background image will be added here by user */}
      </div>
      <div className="monitor-container">
        <div className="monitor-frame">
          <div className="monitor-screen">
            {/* Screen content will go here */}
            <div className="screen-content">
              {/* Placeholder for future content */}
            </div>
          </div>
          <div className="monitor-stand"></div>
          <div className="monitor-base"></div>
        </div>
      </div>
      <CloseButton onClick={handleClose} className="computer-close-button" />
    </div>
  );
};

export default ComputerScreen;

