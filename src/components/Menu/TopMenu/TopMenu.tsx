import React, { useState, useEffect } from 'react';
import './TopMenu.css';

const TopMenu: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  const openFigmaPortfolio = () => {
    window.open(
      'https://www.figma.com/design/WTJIOsVWjiy4fE95dBUJJc/Design-portfolio?t=IdqNFq5tH17HsFwv-1',
      '_blank'
    );
  };

  const openMyGitHub = () => {
    window.open(
      'https://github.com/Lizahalykina'
    );
  };
  
  const openCV = () => {
    window.open(
      '/assets/Liza_Halykina_CV.pdf',
      '_blank'
    );
  };

  const openNotion = () => {
    window.open(
      'https://www.notion.so/The-Making-of-My-Portfolio-6aa82837d16546979b8910ed0a6f0104?pvs=4',
      '_blank'
    );
  };


  return (
    <div className="top-menu-container">
      <div className="top-menu-items">
        <span className="menu-item-time">{currentTime}</span>
        <span className="menu-item" onClick={openCV}>CV</span>
        <span className="menu-item" onClick={openMyGitHub}>GitHub</span>
        <span className="menu-item" onClick={openNotion}>Notion</span>
        <span className="menu-item" onClick={openFigmaPortfolio}>WebDesign</span>
      </div>
    </div>
  );
};

export default TopMenu;
