import React, { useEffect, useRef } from 'react';
import './ActionMenu.css';
import { typeWriterEffect } from '../../../util';

interface ActionCluesType {
  clue: string;
}

const actionClues: ActionCluesType[] = [
  {
    clue: "Take a closer look  — there’s more hidden here than you think. Each item tells a story. Can you find them all and uncover a hidden skill?",
  },
];

const ActionMenu = () => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.innerHTML = '';
      typeWriterEffect(actionClues[0].clue, elementRef.current, 40);
    }
  }, []);

  return (
    <div className="action-menu-container">
      <img src="/assets/DogDetective.png" alt="Detective" className="detective" />
      <div className="action-task">
        <p ref={elementRef}></p> 
      </div>
    </div>
  );
};

export default ActionMenu;
