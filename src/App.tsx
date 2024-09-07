import React, { useState } from 'react';
import TopMenu from './components/Menu/TopMenu/TopMenu';
import BottomMenu from './components/Menu/BottomMenu/BottomMenu';
import CharacterSetup from './components/GroupSetup/CharacterSetup';
import WallSetup from './components/GroupSetup/WallSetup';
import FloorSetup from './components/GroupSetup/FloorSetup';
import WantedScreen from './components/IntroScreen/WantedScreen';
import './App.css';


const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroClose = () => {
    setShowIntro(false);
  };

  return (
    <div className="black-screen">
      {showIntro && <WantedScreen onClose={handleIntroClose} />}
      <TopMenu />
      <div className="frame">
        <div className="app-container">
          <CharacterSetup />
          <WallSetup />
          <FloorSetup />
        </div>
      </div>
      <BottomMenu />
    </div>
  );
};

export default App;
