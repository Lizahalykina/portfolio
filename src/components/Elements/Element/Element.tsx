import { useState, useRef, useEffect } from 'react';
import { ElementType } from '../Elements';
import InfoObjScreen from '../../InfoObjScreen/InfoObjScreen';
import React from 'react';
import '../Elements.css';

const Element = ({ image, style, name, description, audio, element, classname }: ElementType) => {
  const [playing, setPlaying] = useState<HTMLAudioElement | null>(null);
  const [openElement, setOpenElement] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const [objectPosition, setObjectPosition] = useState<{ top: number; left: number; side: 'right' | 'left' } | null>(null);

  useEffect(() => {
    if (!imageRef.current || element) return;
    
    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      canvasRef.current = canvas;
    };
    
    if (img.complete) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      canvasRef.current = canvas;
    }
  }, [image, element]);

  const isPixelTransparent = (x: number, y: number): boolean => {
    if (!canvasRef.current) return true;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return true;
    
    // Get pixel data at the clicked position
    const imageData = ctx.getImageData(x, y, 1, 1);
    const alpha = imageData.data[3]; // Alpha channel (0-255)
    
    return alpha === 0; // Return true if pixel is transparent
  };

  const openInfoScreen = (e: React.MouseEvent<HTMLImageElement>) => {
    // Check if clicked pixel is transparent
    if (!element && imageRef.current && canvasRef.current) {
      const img = imageRef.current;
      const rect = img.getBoundingClientRect();
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
      
      const x = Math.floor((e.clientX - rect.left) * scaleX);
      const y = Math.floor((e.clientY - rect.top) * scaleY);
      
      if (isPixelTransparent(x, y)) {
        return; // Don't trigger if clicked on transparent pixel
      }
    }
    playAudio();
    if (element) {
      setOpenElement(true);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const frameElement = document.querySelector('.frame');
      const frameRect = frameElement?.getBoundingClientRect();
      
      if (frameRect) {
        const infoWidth = 200;
        const padding = 10;
        const objectRight = rect.right;
        const objectLeft = rect.left;
        const frameRight = frameRect.right;
        const frameLeft = frameRect.left;
        
        const spaceOnRight = frameRight - objectRight - padding;
        const spaceOnLeft = objectLeft - frameLeft - padding;
        
        let left: number;
        let side: 'right' | 'left';
        
        if (spaceOnRight >= infoWidth) {
          left = objectRight + padding;
          side = 'right';
        } else if (spaceOnLeft >= infoWidth) {
          left = objectLeft - padding - infoWidth;
          side = 'left';
        } else {
          if (spaceOnRight > spaceOnLeft) {
            left = Math.min(objectRight + padding, frameRight - infoWidth);
            side = 'right';
          } else {
            left = Math.max(objectLeft - padding - infoWidth, frameLeft);
            side = 'left';
          }
        }
        
        const infoHeight = 150;
        let top = rect.top + rect.height / 2;
        
        if (top - infoHeight / 2 < frameRect.top) {
          top = frameRect.top + infoHeight / 2;
        }
        if (top + infoHeight / 2 > frameRect.bottom) {
          top = frameRect.bottom - infoHeight / 2;
        }
        
        setObjectPosition({
          top,
          left,
          side
        });
        setShowInfoScreen(true);
      }
    }
  };

  const closeInfoScreen = () => {
    stopAudio();
    if (element) {
      setOpenElement(false);
    } else {
      setShowInfoScreen(false);
      setObjectPosition(null);
    }
  };

  return (
    <div style={{ top: style.top, left: style.left, position: 'absolute', zIndex: style.zIndex, pointerEvents: 'none' }} className={classname}>
      {showInfoScreen && objectPosition && (
        <InfoObjScreen 
          onClose={closeInfoScreen} 
          objName={name} 
          objDescription={description}
          position={objectPosition}
        />
      )}
      <img 
        ref={imageRef}
        src={image} 
        alt={image} 
        style={{ 
          width: style.width,
          cursor: `url('/assets/MagnifyingGlass.png') 16 16, pointer`,
          pointerEvents: 'auto'
        }} 
        onClick={openInfoScreen} 
        className="clickable-object" 
      />
      
      {element && React.cloneElement(element, { open: openElement, onClose: closeInfoScreen })}
    </div>
  );
};

export default Element;
