import { useState } from 'react';
import { ElementType } from '../Elements';
import InfoObjScreen from '../../InfoObjScreen/InfoObjScreen';
import React from 'react';

const Element = ({ image, style, name, description, audio, element, classname }: ElementType) => {
  const [playing, setPlaying] = useState<HTMLAudioElement | null>(null);
  const [openElement, setOpenElement] = useState(false);

  const playAudio = () => {
    if (!audio) return;
    if (playing) {
      playing.pause();
      playing.currentTime = 0;
    }

    const sound = new Audio(audio);
    sound.play();
    setPlaying(sound);
  };

  const stopAudio = () => {
    if (!audio) return;
    if (playing) {
      playing.pause();
      playing.currentTime = 0;
    }
  };

  const [zIndex, setZIndex] = useState(style.zIndex);
  const [showInfoScreen, setShowInfoScreen] = useState(false);

  const openInfoScreen = () => {
    setZIndex('9999');
    playAudio();
    if (element) {
      setOpenElement(true);
    } else {
      setShowInfoScreen(true);
    }
  };

  const closeInfoScreen = () => {
    setZIndex(style.zIndex);
    stopAudio();
    if (element) {
      setOpenElement(false);
    } else {
      setShowInfoScreen(false);
    }
  };

  return (
    <div style={{ top: style.top, left: style.left, position: 'absolute', zIndex }} className={classname}>
      {showInfoScreen && (
        <InfoObjScreen onClose={closeInfoScreen} objName={name} objDescription={description} />
      )}
      <img src={image} alt={image} style={{ width: style.width }} onClick={openInfoScreen} />
      
      {element && React.cloneElement(element, { open: openElement, onClose: closeInfoScreen })}
    </div>
  );
};

export default Element;
