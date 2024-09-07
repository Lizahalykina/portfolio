import React, { useEffect, useRef } from 'react';
import './ActionMenu.css';
import { typeWriterEffect } from '../../../util';

interface ActionCluesType {
  clue: string;
}

const actionClues: ActionCluesType[] = [
  {
    clue: "Ah, I see you've made it here. Welcome! You’re about to take a closer look at a day in my life. But don’t just watch—there’s more hidden in this room than meets the eye. Each item tells a story about me and what I do. Your task is to find them all! Who knows what hidden skill you might uncover? Ready? Let’s begin!",
  },
];

const ActionMenu: React.FC = () => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.innerHTML = '';
      typeWriterEffect(actionClues[0].clue, elementRef.current, 40);
    }
  }, []);

  return (
    <div className="action-menu-container">
      <img src="/assets/TaskPicture.png" alt="Task Picture" className="task-picture" />
      <div className="action-task">
        <p ref={elementRef}></p> 
      </div>
    </div>
  );
};

export default ActionMenu;
