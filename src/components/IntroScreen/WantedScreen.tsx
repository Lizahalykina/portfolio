import React from 'react';
import './WantedScreen.css';

const WantedScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="wanted-screen">
      <div className="wanted-content">
        <h1>MISSING:</h1>
        <h1>Front end developer</h1>
        <div className="wanted-container">
          <img src="/assets/TaskPicture.png" alt="Wanted Picture" className="wanted-picture" />
          <img src="/assets/TaskPicture.png" alt="Wanted Picture" className="wanted-picture" />
        </div>
        <p>So glad to have you here. This project is still at a rough stage, but I hope it shows some of my coding skills and processes.</p>
        <button onClick={onClose}>Start looking</button>
      </div>
    </div>
  );
};

export default WantedScreen;
