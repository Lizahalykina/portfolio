import { useState } from 'react';
import { ElementType } from '../Elements';
import InfoObjScreen from '../../InfoObjScreen/InfoObjScreen';

const Element = ({image, style, name, description} : ElementType) => {

  const [zIndex, setZIndex] = useState(style.zIndex)
  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const openInfoScreen = () => {setShowInfoScreen(true); setZIndex('999')}
  const closeInfoScreen = () => {setShowInfoScreen(false); setZIndex(style.zIndex)}

  return (
    <div style={{ top: style.top, left: style.left, position: 'absolute' , zIndex }}>
      {showInfoScreen && <InfoObjScreen onClose={closeInfoScreen} objName={name} objDescription={description}/>}
      <img src={image} alt={image} style={{width: style.width }} onClick={openInfoScreen}/>
    </div>
  );
};

export default Element;
