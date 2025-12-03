import React, { useState, useEffect  } from 'react';
import IntroScreen from './components/IntroScreen/IntroScreen/IntroScreen';
import { preloadRoomImages } from './util';
import TopMenu from './components/Menu/TopMenu/TopMenu';
import BottomMenu from './components/Menu/BottomMenu/BottomMenu';
import DrawerSetup from './components/GroupSetup/DrawerSetup';
import CharacterSetup from './components/GroupSetup/CharacterSetup';
import WallSetup from './components/GroupSetup/WallSetup';
import FloorSetup from './components/GroupSetup/FloorSetup';
import CharacterFile from './components/IntroScreen/CharacterFile/CharacterFile';
import IntroductionBubble from './components/IntroScreen/IntroductionBubble/IntroductionBubble';
import WeatherWindow from './components/WeatherWindow/WeatherWindow';
import StickyNoteScreen from './components/StickyNoteScreen/StickyNoteScreen';
import './App.css';




const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showIntroductionBubble, setShowIntroductionBubble] = useState(false);
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [startActionAnimation, setStartActionAnimation] = useState(false);
  const [showStickyNoteScreen, setShowStickyNoteScreen] = useState(false);
  const [showCharacterFile, setShowCharacterFile] = useState(false);
  const [characterFileEntering, setCharacterFileEntering] = useState(false);
  const [roomFadeIn, setRoomFadeIn] = useState(false);

  useEffect(() => {
    // Start preloading room images immediately when component mounts
    preloadRoomImages();
  }, []);

  const handleIntroScreenComplete = () => {
    // This is called after the fade out animation completes
    setShowIntroScreen(false);
    // Show character file and start room fade-in after intro completes
    setShowCharacterFile(true);
    setCharacterFileEntering(true);
    setRoomFadeIn(true);
  };

  const handleIntroClose = () => {
    setShowIntro(false);
    setShowCharacterFile(false);
    // Room is already visible, just remove blur/darkening
    setShowIntroductionBubble(true);
  };

  const handleBubbleClose = () => {
    setShowIntroductionBubble(false);
    setStartActionAnimation(true);
  };

  const handleStickyNoteScreenClose = () => {
    setShowStickyNoteScreen(false);
  };

  return (
    <>
      {showIntroScreen && <IntroScreen onComplete={handleIntroScreenComplete} />}
      <div className="black-screen" style={{ display: showIntroScreen ? 'none' : 'flex' }}>
        {showStickyNoteScreen ? (
          <StickyNoteScreen open={true} onClose={handleStickyNoteScreenClose} />
        ) : (
          <>
            {(showCharacterFile || showIntro) && <CharacterFile onClose={handleIntroClose} isEntering={characterFileEntering} />}
            {showIntroductionBubble && <IntroductionBubble onClose={handleBubbleClose} />}
            <div className={`screen-container ${roomFadeIn ? 'fade-in' : ''} ${(showCharacterFile || showIntro) ? 'blurred-darkened' : ''}`}>
              <TopMenu />
              <div className="frame" style={{ backgroundImage: `url('/assets/Background.png')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                <div className="app-container">
                  {/* <WeatherWindow /> */}
                  <DrawerSetup />
                  <CharacterSetup />
                  <WallSetup onOpenStickyNoteScreen={() => setShowStickyNoteScreen(true)} />
                  <FloorSetup />
                </div>
              </div>
              <BottomMenu startActionAnimation={startActionAnimation} />
            </div>
          </>
        )}
      </div>
      {/* Render room in background during intro for preloading - hidden off-screen */}
      {showIntroScreen && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
          <div className="black-screen">
            <div className="screen-container">
              <TopMenu />
              <div className="frame" style={{ backgroundImage: `url('/assets/Background.png')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
                <div className="app-container">
                  <DrawerSetup />
                  <CharacterSetup />
                  <WallSetup onOpenStickyNoteScreen={() => {}} />
                  <FloorSetup />
                </div>
              </div>
              <BottomMenu startActionAnimation={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
