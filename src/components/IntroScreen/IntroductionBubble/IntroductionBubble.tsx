import React, { useEffect, useRef } from 'react';
import './IntroductionBubble.css';
import { typeWriterEffect } from '../../../util';
import CloseButton from '../../Common/CloseButton/CloseButton';

interface IntroductionBubbleProps {
  onClose: () => void;
}

const IntroductionBubble: React.FC<IntroductionBubbleProps> = ({ onClose }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  // const introductionText = "Welcome to the Liza's Room! You can explore the room and interact with the items around you. see if you can find objects that might be related to different skills Liza has. Or click on the computer to see the projects she has worked on. Let's begin!";
  const introductionText = "This portfolio is still under construction, but Liza is working hard on making sure this works perfectly. In the meantime, click around if you're interested in some work in progress.";

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = '';
      const cleanup = typeWriterEffect(introductionText, textRef.current, 30);
      return cleanup;
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

