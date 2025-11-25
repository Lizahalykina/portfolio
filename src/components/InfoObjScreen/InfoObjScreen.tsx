import React from 'react';
import { createPortal } from 'react-dom';
import './InfoObjScreen.css';

interface InfoObjScreenType {
   onClose: () => void;
   objName: string;
   objDescription: string;
   position: { top: number; left: number; side: 'right' | 'left' };
}

const InfoObjScreen = ({ onClose, objName, objDescription, position} : InfoObjScreenType) => {
  return createPortal(
      <div 
        className="info-objContent"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <h4>{objName}</h4>
        <p>{objDescription}</p>
        <button onClick={onClose}>close</button>
      </div>,
      document.body
  );
};

export default InfoObjScreen;
