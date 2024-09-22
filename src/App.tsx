import React, { useState, useEffect  } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import TopMenu from './components/Menu/TopMenu/TopMenu';
import BottomMenu from './components/Menu/BottomMenu/BottomMenu';
import DrawerSetup from './components/GroupSetup/DrawerSetup';
import CharacterSetup from './components/GroupSetup/CharacterSetup';
import WallSetup from './components/GroupSetup/WallSetup';
import FloorSetup from './components/GroupSetup/FloorSetup';
import CharacterFile from './components/IntroScreen/CharacterFile/CharacterFile';
import StickyNoteScreen from './components/StickyNoteScreen/StickyNoteScreen';
import WeatherWindow from './components/WeatherWindow/WeatherWindow';
import './App.css';




const App = () => {
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
          <div className="screen-container">
            <TopMenu />
          <div className="frame">
            <div className="app-container">
              {/* <WeatherWindow /> */}
              <DrawerSetup />
              <CharacterSetup />
              <WallSetup />
              <FloorSetup />
            </div>
          </div>
          <BottomMenu />
          </div>
          
        </div>
      )}
    </>
  );
};

export default App;
