import React from 'react';
import './DetectiveDesk.css';

interface DetectiveDeskProps {
  children?: React.ReactNode;
}

const DetectiveDesk: React.FC<DetectiveDeskProps> = ({ children }) => {
  return (
    <div className="detective-desk-screen">
      <div className="detective-desk-background">
        {/* style={{ backgroundImage: `url('/assets/DeskWoodTexture.png')` }} */}
      </div>
      {children}
    </div>
  );
};

export default DetectiveDesk;

