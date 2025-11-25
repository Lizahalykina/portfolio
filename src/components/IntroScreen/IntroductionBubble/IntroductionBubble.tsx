import React, { useEffect, useRef } from 'react';
import './IntroductionBubble.css';
import { typeWriterEffect } from '../../../util';
import CloseButton from '../../Common/CloseButton/CloseButton';

interface IntroductionBubbleProps {
  onClose: () => void;
}

const IntroductionBubble: React.FC<IntroductionBubbleProps> = ({ onClose }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const introductionText = "Welcome to the investigation! I'm your detective guide. Explore this room and interact with the items around you. Each object holds a clue about my skills and experience. Click on anything that catches your eye to learn more. Let's begin!";

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = '';
      typeWriterEffect(introductionText, textRef.current, 30);
    }
  }, []);

  return (
    <div className="introduction-bubble-container">
      <div className="introduction-bubble">
        <CloseButton onClick={onClose} className="bubble-close-button" />
        <img src="/assets/DogDetective.png" alt="Detective Dog" className="bubble-detective" />
        <div className="bubble-content">
          <p ref={textRef}></p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionBubble;

