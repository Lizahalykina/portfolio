import React, { useState, useEffect  } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import TopMenu from './components/Menu/TopMenu/TopMenu';
import BottomMenu from './components/Menu/BottomMenu/BottomMenu';
import SideMenu from './components/Menu/SideMenu/SideMenu';
import CharacterSetup from './components/GroupSetup/CharacterSetup';
import WallSetup from './components/GroupSetup/WallSetup';
import FloorSetup from './components/GroupSetup/FloorSetup';
import CharacterFile from './components/IntroScreen/CharacterFile/CharacterFile';
import './App.css';



const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleIntroClose = () => {
    setShowIntro(false);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="black-screen">
          {showIntro && <CharacterFile onClose={handleIntroClose} />}
          <TopMenu />
          <div className="frame">
            <div className="app-container">
              <CharacterSetup />
              <WallSetup />
              <FloorSetup />
            </div>
            <SideMenu />
          </div>
          <BottomMenu />
        </div>
      )}
    </>
  );
};

export default App;
