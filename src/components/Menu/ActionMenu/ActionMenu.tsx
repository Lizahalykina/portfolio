import React, { useEffect, useRef } from 'react';
import './ActionMenu.css';
import { typeWriterEffect } from '../../../util';

interface ActionCluesType {
  clue: string;
}

const actionClues: ActionCluesType[] = [
  {
    clue: "Work in progress: Items show descriptions when clicked. Sticky Notes, Piano, and Zuko have extra features. More interactivity coming soon.",
  },
];

interface ActionMenuProps {
  startAnimation?: boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ startAnimation = false }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (elementRef.current && startAnimation) {
      elementRef.current.innerHTML = '';
      const cleanup = typeWriterEffect(actionClues[0].clue, elementRef.current, 40);
      return cleanup;
    }
  }, [startAnimation]);

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
