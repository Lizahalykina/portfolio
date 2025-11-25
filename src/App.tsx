import React, { useState, useEffect  } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import TopMenu from './components/Menu/TopMenu/TopMenu';
import BottomMenu from './components/Menu/BottomMenu/BottomMenu';
import DrawerSetup from './components/GroupSetup/DrawerSetup';
import CharacterSetup from './components/GroupSetup/CharacterSetup';
import WallSetup from './components/GroupSetup/WallSetup';
import FloorSetup from './components/GroupSetup/FloorSetup';
import CharacterFile from './components/IntroScreen/CharacterFile/CharacterFile';
import IntroductionBubble from './components/IntroScreen/IntroductionBubble/IntroductionBubble';
import WeatherWindow from './components/WeatherWindow/WeatherWindow';
import './App.css';




const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showIntroductionBubble, setShowIntroductionBubble] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleIntroClose = () => {
    setShowIntro(false);
    setTimeout(() => {
      setShowIntroductionBubble(true);
    }, 1000);
  };

  const handleBubbleClose = () => {
    setShowIntroductionBubble(false);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="black-screen">
          {showIntro && <CharacterFile onClose={handleIntroClose} />}
          {showIntroductionBubble && <IntroductionBubble onClose={handleBubbleClose} />}
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
